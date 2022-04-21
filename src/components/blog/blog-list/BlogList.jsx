import React from "react";
import { Col, Row } from "react-bootstrap";
import posts from "../../../data/posts.json";
import BlogItem from "../blog-item/BlogItem";
import { useState, useEffect } from "react";

const BlogList = ({ blogs }) => {
  return (
    <Row>
      {blogs.map((post) => (
        <Col
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem key={post._id} {...post} />
        </Col>
      ))}
    </Row>
  );
};

export default BlogList;
