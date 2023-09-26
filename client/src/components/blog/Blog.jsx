import React, { useEffect, useState } from "react";
import "./blog.css";
import Container from "react-bootstrap/Container";
import BlogCard from "../cards/BlogCard";
import { Row } from "react-bootstrap";
import axios from "axios";
import loader from "../../assets/loader.gif";

const Blog = () => {
  const [blog, setBlog] = useState([]);
   const [isloading, setLoading] = useState(false);
   const [hasError, setHasError] = useState(false);
   const [error, setError] = useState("");
const getData = async () => {
   await axios.get("http://localhost:5000/blog/")
  .then((res) => {
    setHasError(false);
    setLoading(false);
    console.log(res.data.blog);
    setBlog(res.data.blog)
  }) .catch ((error) => {
    setLoading(false);
    console.log(err.response.data.message);
    setHasError(true);
    setError(error.response.data.message);
  })
};
useEffect(() => {
  getData();
},[]);

  return (
    <>
      {isloading && (
        <div>
          <img style={{ width: 100 }} src={loader} alt="" />
        </div>
      )}
      {!isloading && !hasError && (
        <Container fluid className="Blogs mb-5 p-4">
          <h1 className="title">Recent Posts</h1>
          <Row className="g-4 mb-5 mt-2">
            {blog.map((blog, index) => (
              <BlogCard key={index} blog={blog} />
            ))}
          </Row>
        </Container>
      )}
      {hasError && (
        <div>
          <p style={{ color: "red" }}>Error:- {error}</p>
        </div>
      )}
    </>
  );
};

export default Blog;
