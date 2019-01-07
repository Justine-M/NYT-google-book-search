import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Books extends Component {
  state = {
    bookSearch: [],
    bookData: [],
    title: "",
    authors: "",
    description: ""
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ bookSearch: res.data})
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
       // When the form is submitted, prevent its default behavior, get books update the books state
   event.preventDefault();
   API.getBooks(this.state.bookSearch)
     .then(res => {
       res.data.items.forEach(data => {
         // console.log(data.volumeInfo)
         let authors = ""
         let image = ""
         // let authors = data.volumeInfo.authors.join().replace(",", " & ")

         if (data.volumeInfo.authors === undefined) {
           authors = data.volumeInfo.authors
         } else {
           authors = data.volumeInfo.authors.join().replace(/,/gi, ", ");
         }

         if (data.volumeInfo.imageLinks === undefined) {
           image = "https://placehold.it/128x196"

         } else {
           image = data.volumeInfo.imageLinks.thumbnail;
         }

         bookData.push({
           title: data.volumeInfo.title,
           authors: authors,
           description: data.volumeInfo.description,
           image: image,
           infoLink: data.volumeInfo.infoLink,
         })

         this.setState({ bookSearch: bookData });
       })
     })
     .catch(err => console.log(err));

   this.setState({ bookSearch: "" })
 };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.authors}
                onChange={this.handleInputChange}
                name="author"
                placeholder="Author (required)"
              />
              <TextArea
                value={this.state.description}
                onChange={this.handleInputChange}
                name="synopsis"
                placeholder="Description (Optional)"
              />
              <FormBtn
                disabled={!(this.state.authors && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.authors}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
