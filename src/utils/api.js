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
  const token = localStorage.getItem("token"); // recupera il token salvato
  const res = await fetch("http://localhost:3001/authors", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // aggiunge il token all'header
      "Content-Type": "application/json"
    }
  });

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


// LOGIN
export const loginUser = async (email, password) => {
  const res = await fetch("http://localhost:3001/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.message || "Login fallito")
  }

  const { accessToken } = await res.json()
  localStorage.setItem("token", accessToken) // ✅ salva il token
  return accessToken
}

// REGISTRAZIONE
export const registerUser = async (userData) => {
  const res = await fetch("http://localhost:3001/authors", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  })

  if (!res.ok) throw new Error("Errore nella registrazione")
  return await res.json()
}

// UTENTE LOGGATO (/me)
export const fetchLoggedUser = async () => {
  const token = localStorage.getItem("token")
  if (!token) throw new Error("Token mancante")

  const res = await fetch("http://localhost:3001/login/me", {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!res.ok) throw new Error("Token non valido o scaduto")
  return await res.json()
}



