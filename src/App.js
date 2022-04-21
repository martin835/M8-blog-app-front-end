import React from "react";
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import Blog from "./views/blog/Blog";
import NewBlogPost from "./views/new/New";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadBlogs();
  }, []);

  useEffect(() => {
    // Do we have an access token in the URL?
    const token = new URLSearchParams(window.location.search).get(
      "accessToken"
    );

    if (token) {
      localStorage.setItem("token", token);
      navigate(window.location.pathname);
    }
  }, []);

  const loadBlogs = async () => {
    console.log("i am mounted");
    const apiUrl = process.env.REACT_APP_BE_URL;

    try {
      let response = await fetch(`${apiUrl}/blogPosts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        let data = await response.json();
        console.log(data);

        setBlogs(data.data);
        //setIsLoading(false);
      } else {
        alert("something went wrong :(");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Home blogs={blogs} />} />
        <Route path="/blog/:id" element={<Blog blogs={blogs} />} />
        <Route path="/new" element={<NewBlogPost />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
