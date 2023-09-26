import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import BlogCard from '../cards/BlogCard';
const SingleCategory = () => {
    const [blog, setBlog] =useState([])
      let params = useParams();

      const getData = async () => {
        let res = await axios.get(
          "http://localhost:5000/blog/category/" + params.category
        )
        .then((res) => {
          console.log(res);
          setBlog(res.data.blogDetails)
        })
        .catch((err) => {
          console.log(err.response.data.message)
        })
      };

      useEffect(() => {
        getData();
      }, []);

  return (
    <Container
      fluid
      className="Blogs d-flex flex-column mb-5 p-4"
      style={{ marginTop:"70px"}}
    >
      <h1 className="title d-flex justify-content-center">
        Blogs of {params.category} category
      </h1>
      <Row className="g-4 mt-2">
        {blog.map((blog, index) => (
          <BlogCard key={index} blog={blog} />
        ))}
      </Row>
    </Container>
  );
}

export default SingleCategory