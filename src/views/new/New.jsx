import React, { useCallback, useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.css";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useNavigate } from "react-router-dom";


// Importa le funzioni dal file api.js
import { fetchAuthors, postData } from "../../utils/api";

const NewBlogPost = () => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [authors, setAuthors] = useState([]);
  const [authorId, setAuthorId] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const navigate = useNavigate();


  useEffect(() => {
    fetchAuthors()
      .then(setAuthors)
      .catch((err) => console.error("Errore nel recupero autori:", err));
  }, []);

  const handleChange = useCallback((value) => {
    setText(draftToHtml(value));
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const uploadCoverImage = async (file, postId) => {
    const formData = new FormData();
    formData.append("cover", file);

    const res = await fetch(process.env.REACT_APP_APIURL + `/blog/${postId}/cover`, {
      method: "PATCH",
      body: formData,
    });

    if (!res.ok) throw new Error("Errore nell'upload della cover");
    return await res.json(); // post aggiornato con URL della cover
  };



  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!authorId) return alert("Seleziona un autore!");
    if (!category) return alert("Seleziona una categoria!");
    if (!coverImage) return alert("Carica una cover!");

    const newPost = {
      title,
      category,
      content: text,
      author: authorId,
      readTime: {
        value: 7,
        unit: "minuti",
      },
    };

    try {
      // Step 1: crea il post senza cover
      const createdPost = await postData(newPost);

      // Step 2: carica la cover
      const updatedPost = await uploadCoverImage(coverImage, createdPost._id);

      console.log("Post aggiornato con cover:", updatedPost);

      alert("Post creato con successo!");
      // reset del form
      setTitle("");
      setCategory("");
      setAuthorId("");
      setText("");
      setCoverImage(null);
      setCoverPreview(null);
      navigate("/");
    } catch (err) {
      console.error("Errore nel submit:", err);
      alert("Errore nella creazione del post");
    }
  };



  return (
    <Container className="new-blog-container">
      <Form onSubmit={handleSubmit} className="mt-5">
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Titolo</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Categoria</Form.Label>
          <Form.Control
            size="lg"
            as="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option disabled value="">
              -
            </option>
            <option value="categoria1">Categoria 1</option>
            <option value="categoria2">Categoria 2</option>
            <option value="categoria3">Categoria 3</option>
            <option value="categoria4">Categoria 4</option>
            <option value="categoria5">Categoria 5</option>



          </Form.Control>
        </Form.Group>

        <Form.Group controlId="blog-author" className="mt-3">
          <Form.Label>Autore</Form.Label>
          <Form.Control
            as="select"
            size="lg"
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
          >
            <option value="">Seleziona un autore</option>
            {authors.map((author) => (
              <option key={author._id} value={author._id}>
                {author.nome} {author.cognome}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Contenuto Blog</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            placeholder="Scrivi il contenuto del post..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="blog-cover" className="mt-3">
          <Form.Label>Immagine di Copertina</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {coverPreview && (
            <div className="mt-3">
              <img
                src={coverPreview}
                alt="Anteprima Copertina"
                style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
              />
            </div>
          )}
        </Form.Group>

        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{ marginLeft: "1em" }}
          >
            Invia
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
