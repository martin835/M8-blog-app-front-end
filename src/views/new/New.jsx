import React, { useCallback, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./styles.css";
const NewBlogPost = (props) => {
  const [newPost, setNewPost] = useState({
    content: "",
    title: "",
    cover: "https://picsum.photos/400/300",
    category: "",
    readTime: {
      value: "",
      unit: "minutes",
    },
    author: {
      name: "",
      avatar: "https://ui-avatars.com/api/?name=James+Bond",
    },
  });

  const createBlogPost = async (e) => {
    e.preventDefault();
    const apiUrl = process.env.REACT_APP_BE_URL;
    try {
      let response = await fetch(`${apiUrl}/blogPosts`, {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (response.ok) {
        console.log(response);
        alert("article posted!");
        setNewPost({
          content: "",
          title: "",
          cover: "",
          category: "",
          readTime: {
            value: null,
            unit: "minutes",
          },
          author: {
            name: "",
            avatar: "",
          },
        });
      } else {
        // what type of error will fall here?
        // here it means you connected to the server, but something went wrong!
        alert("something went wrong! please try again");
        // just some examples...
        if (response.status === 400) {
          alert("some data was wrong");
        }
        if (response.status === 400) {
          alert("not found");
        }
      }
    } catch (error) {
      // what type of error will fall here?
      // you probably have some internet problems :(
      console.log(error);
    }
  };

  return (
    <Container className="new-blog-container">
      <Form className="mt-5" onSubmit={(e) => createBlogPost(e)}>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Title"
            value={newPost.title}
            onChange={(e) => {
              setNewPost({ ...newPost, title: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group controlId="blog-cover-image" className="mt-3">
          <Form.Label>Cover image link</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Cover image link"
            value={newPost.cover}
            onChange={(e) => {
              setNewPost({ ...newPost, cover: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group controlId="blog-author" className="mt-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Author name"
            value={newPost.author.name}
            onChange={(e) => {
              setNewPost({
                ...newPost,
                author: { ...newPost.author, name: e.target.value },
              });
            }}
          />
        </Form.Group>
        <Form.Group controlId="blog-avatar" className="mt-3">
          <Form.Label>Avatar link</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Avatar link"
            value={newPost.author.avatar}
            onChange={(e) => {
              setNewPost({
                ...newPost,
                author: { ...newPost.author, avatar: e.target.value },
              });
            }}
          />
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            size="lg"
            as="select"
            value={newPost.category}
            onChange={(e) => {
              setNewPost({
                ...newPost,
                category: e.target.value,
              });
            }}
          >
            <option>Tech</option>
            <option>Hobby</option>
            <option>Garden</option>
            <option>Junk</option>
            <option>Auto</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="blog-read-time" className="mt-3">
          <Form.Label>Read time (minutes)</Form.Label>
          <Form.Control
            size="lg"
            type="number"
            placeholder="Read time in minutes (0-60)"
            value={newPost.readTime.value}
            onChange={(e) => {
              setNewPost({
                ...newPost,
                readTime: {
                  ...newPost.readTime,
                  value: parseInt(e.target.value),
                },
              });
            }}
          />
        </Form.Group>
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Blog Content</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Write blog here"
            style={{ height: "300px" }}
            value={newPost.content}
            onChange={(e) => {
              setNewPost({
                ...newPost,
                content: e.target.value,
              });
            }}
          />
          {/* {<ReactQuill
            value={newPost.content}
            onChange={(e) => {
              setNewPost({
                ...newPost,
                content: e.target.value,
              });
            }}
            className="new-blog-content"
          />} */}
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
          >
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
