import { React, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";

const BlogCard = ({ blog }) => {
  const nevigate = useNavigate();

  // read more
  const detailRequest = (id) => {
    nevigate("/readMore/" + id);
  };

  // edit blog
  const editRequest = (id) => {
    nevigate("/editBlog/" + id);
  };

  // delete blog
  const deleteRequest = (id, image) => {
    let res = axios
      .delete(
        "http://localhost:5000/blog?" + "id=" + id + "&imageUrl=" + image,
        {
          headers: { authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((res) => {
        console.log(res.data.message);
        window.location.reload();
       
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <>
      <div className="cardBody col col-12 col-sm-12 col-md-6 col-lg-4 d-flex flex-column justify-content-center">
        <div className="card p-2">
          <div
            className="image"
            style={{ width: "100%", height: "250px" }}
          >
            <img
              src={blog.image}
              alt=""
              className="img w-100 h-100"
            />
          </div>
          <Card.Body
            className="mt-2"
            style={{ width: "100%", height: "300px" }}
          >
            <div className="mb-3">
              <span className="category">{blog.category.substring(0, 50)}</span>
            </div>
            <Card.Title className="title">
              {blog.title.substring(0, 50)}
            </Card.Title>
            <Card.Text className="description">
              {blog.description.substring(0, 100)}...
            </Card.Text>
            <div className="col d-flex ">
              <Card.Text>
                By <span className="author">{blog.author}</span>
              </Card.Text>
              <Card.Text className="author mx-3">{blog.createdA}</Card.Text>
            </div>
            <div className="buttons d-flex flex-row">
              <div className="col">
                <button
                  onClick={() => detailRequest(blog._id)}
                  className="btn read-more"
                >
                  READ MORE
                </button>
              </div>
              <div className="col d-flex justify-content-end">
                <div
                  className="edit btn_primary"
                  onClick={() => {
                    editRequest(blog._id);
                  }}
                >
                  <CreateIcon />
                </div>
                <div
                  className="delete btn_primary "
                  onClick={() => {
                    deleteRequest(blog._id, blog.image);
                  }}
                >
                  <DeleteIcon />
                </div>
              </div>
            </div>
          </Card.Body>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
