// src/utils/api.js
export const fetchPosts = async (authorId = '', title = '') => {
    let endpoint = 'http://localhost:3001/blog?';
  
    if (authorId) endpoint += `author=${authorId}&`;
    if (title) endpoint += `title=${encodeURIComponent(title)}`;
  
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error("Errore nel recupero dei post");
    return await res.json();
  };
  
  
  export const fetchAuthors = async () => {
    const res = await fetch("http://localhost:3001/authors");
    if (!res.ok) throw new Error("Errore nel recupero degli autori");
    return await res.json();
  };
  
  export const postData = async (post) => {
    const res = await fetch("http://localhost:3001/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
  
    if (!res.ok) throw new Error(`Errore nella POST: ${res.status}`);
    return await res.json();
  };
  
  export const fetchSinglePost = async (id) => {
    const res = await fetch(`http://localhost:3001/blog/${id}`);
    if (!res.ok) throw new Error("Post non trovato");
    return await res.json();
  };
  


  