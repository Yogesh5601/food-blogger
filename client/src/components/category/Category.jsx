import React, { useEffect, useState } from "react";
import "./category.css"
import CategoryCard from "../cards/CategoryCard";
import axios from "axios";
import { Container, Row } from "react-bootstrap";

const Category = () => {
    const [category, setCategory] = useState([]);
    const getData = async () => {
      await axios.get("http://localhost:5000/category/")
      .then((res) =>{
        console.log(res.data.category);
        setCategory(res.data.category);
      }) .catch ((err) => {
        console.log(err.response.data);
      })
    };
    useEffect(() => {
      getData();
    },[])
  return (
    <>
      <Container fluid className="categories p-4">
        <h1 className="title mt-5">Popular Categories</h1>
        <Row className="categorie mt-3 flex-wrap justify-content-between">
          {category.map((category, index) => (
            <CategoryCard key={index} category={category} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Category;
