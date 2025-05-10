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
  const navigate = useNavigate();

  useEffect(() => {
    fetchAuthors()
      .then(setAuthors)
      .catch((err) => console.error("Errore nel recupero autori:", err));
  }, []);

  const handleChange = useCallback((value) => {
    setText(draftToHtml(value));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!authorId) return alert("Seleziona un autore!");
    if (!category) return alert("Seleziona una categoria!");

    const newPost = {
      title,
      category,
      content: text,
      author: authorId,
      cover: "https://picsum.photos/1000/300",
      readTime: {
        value: 7,
        unit: "minuti",
      },
    };

    console.log("POST INVIATO AL SERVER:", newPost);

    try {
      const result = await postData(newPost);
      if (result) {
        alert("Post creato con successo!");
        // reset del form
        setTitle("");
        setCategory("");
        setAuthorId("");
        setText("");
        // redirect
        navigate("/");
      }
    } catch (err) {
      console.error("Errore nel submit:", err);
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
