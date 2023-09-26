import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";

const ReadMore = () => {
  const [blog, setBlog] = useState([]);

  let params = useParams();

  const getData = async () => {
    let res = await axios.get("http://localhost:5000/blog/" + params.id, {
        headers: { authorization: "Bearer " + localStorage.getItem("token") },
      })
    .then((res) => {
        console.log(res.data.blog);
      setBlog(res.data.blog);
    })
    .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  useEffect(() => {
    getData()
  },[])

  return (
    <>
      <Container className="mb-5" style={{marginTop:"100px" }}>
        <div className="cardBody justify-content-center mt-5 ">
          <div className="card p-2 ">
            <div className="image w-100">
              <img src={blog.image} alt="" className="img w-100 h-100" />
            </div>
            <Card.Body>
              <div className="mb-2">
                <span className="category">{blog.category}</span>
              </div>
              <Card.Title>{blog.title}</Card.Title>
              <Card.Text>{blog.description}</Card.Text>
              <div className="col d-flex ">
                <Card.Text>
                  By <span className="author">{blog.author}</span>
                </Card.Text>
                <Card.Text className="author mx-3">{blog.author}</Card.Text>
              </div>
            </Card.Body>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ReadMore;
