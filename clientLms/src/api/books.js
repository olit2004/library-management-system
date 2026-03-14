import api from './auth'; 

export const getBooks = (filters) => 
  api.get('/books', { params: filters }); 


export const getBook = (id) => 
  api.get(`/book/${id}`);

export const getAvailability = (id) => 
  api.get(`/availability/${id}`);

export const createBook = (bookData) => 
  api.post('/book', bookData);

export const updateBook = (bookData) => 
  api.post('/updateBook', bookData); 

export const removeBook = (id) => 
  api.delete(`/book/${id}`);

export const countBook =()=> api.get("/book/count")

export const googleSearch = (query) => 
  api.get('/books/google-search', { params: { q: query } });

export const syncBook = (id) => 
  api.post(`/books/sync/${id}`);