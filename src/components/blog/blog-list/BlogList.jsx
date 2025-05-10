import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";
import { fetchPosts, fetchAuthors } from "../../../utils/api";

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch iniziale: carica tutti gli autori e i post
  useEffect(() => {
    fetchAuthors().then(setAuthors).catch(console.error);
    fetchPosts().then(setPosts).catch(console.error);
  }, []);

  // Aggiorna i post quando cambia autore
  useEffect(() => {
    fetchPosts(selectedAuthor, searchTerm).then(setPosts).catch(console.error);
  }, [selectedAuthor]);

  // Bottone per avviare ricerca per titolo
  const handleSearch = () => {
    fetchPosts(selectedAuthor, searchTerm).then(setPosts).catch(console.error);
  };

  return (
    <>
      <Form.Group className="mb-4">
        <Form.Label>Filtra per autore</Form.Label>
        <Form.Control
          as="select"
          value={selectedAuthor}
          onChange={(e) => setSelectedAuthor(e.target.value)}
        >
          <option value="">Tutti gli autori</option>
          {authors.map((author) => (
            <option key={author._id} value={author._id}>
              {author.nome} {author.cognome}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Cerca per titolo</Form.Label>
        <Form.Control
          type="text"
          placeholder="Scrivi parte del titolo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" onClick={handleSearch} className="mb-4">
        Cerca
      </Button>

      <Row>
        {posts.map((post, i) => (
          <Col key={`item-${i}`} md={4} style={{ marginBottom: 50 }}>
            <BlogItem {...post} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default BlogList;
