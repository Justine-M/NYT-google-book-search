import axios from "axios";

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("https://www.googleapis.com/books/v1/volumes", { params: { q: query } });
  },
  // Gets the book with the given id
  // getBook: function(id) {
  //   return axios.get("https://www.googleapis.com/books/v1/volumes?q=" + id);
  // },
  // // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("https://www.googleapis.com/books/v1/volumes?q=" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
