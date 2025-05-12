// src/utils/api.js
export const fetchPosts = async (authorId = '', title = '') => {
  let endpoint = process.env.REACT_APP_APIURL + '/blog?';

  if (authorId) endpoint += `author=${authorId}&`;
  if (title) endpoint += `title=${encodeURIComponent(title)}`;

  const res = await fetch(endpoint);
  if (!res.ok) throw new Error("Errore nel recupero dei post");
  return await res.json();
};

export const fetchAuthors = async () => {
  const token = localStorage.getItem("token"); // recupera il token salvato
  const res = await fetch(process.env.REACT_APP_APIURL + "/authors", {
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
  const res = await fetch(process.env.REACT_APP_APIURL + "/blog", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });

  if (!res.ok) throw new Error(`Errore nella POST: ${res.status}`);
  return await res.json();
};

export const fetchSinglePost = async (id) => {
  const res = await fetch(process.env.REACT_APP_APIURL + `/blog/${id}`);
  if (!res.ok) throw new Error("Post non trovato");
  return await res.json();
};

// LOGIN
export const loginUser = async (email, password) => {
  const res = await fetch(process.env.REACT_APP_APIURL + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.message || "Login fallito")
  }

  const { accessToken } = await res.json()
  localStorage.setItem("token", accessToken) // salva il token
  return accessToken
}

// LOGOUT
  export const logoutUser = () => {
    localStorage.removeItem("token")

  } 




// REGISTRAZIONE
export const registerUser = async (userData) => {
  const res = await fetch(process.env.REACT_APP_APIURL + "/authors", {
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

  const res = await fetch(process.env.REACT_APP_APIURL + "/login/me", {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!res.ok) throw new Error("Token non valido o scaduto")
  return await res.json()
}

// LOGIN WITH GOOGLE
export const loginWithGoogle = async (idToken) => {
  const res = await fetch(process.env.REACT_APP_APIURL + "/login/google", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });

  const json = await res.json();
  //console.log("Backend response JSON:", json);

  if (!res.ok) {
    throw new Error(json.message || "Google login failed");
  }

  const { accessToken } = json;
  //console.log("Extracted accessToken:", accessToken);

  localStorage.setItem("token", accessToken);
  return accessToken;
};

// comments
export const fetchPostComments = async (postId, page = 1, limit = 5) => {
  const token = localStorage.getItem("token");
  const res = await fetch(process.env.REACT_APP_APIURL + `/blog/${postId}/comments?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  if (!res.ok) throw new Error("Errore nel recupero dei commenti");
  const data = await res.json();
  return data.comments;
};


