import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import pictureIcon from "../../assets/picture-icon.png";
import loader from "../../assets/loader.gif";
const EditBlog = () => {
  const [selectedFile, setSelectdeFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(pictureIcon);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [isloading, setLoading] = useState(false);
  const nevigate = useNavigate();
  let params = useParams();

  const getData = async () => {
    let res = await axios.get("http://localhost:5000/blog/" + params.id, {
      headers: { authorization: "Bearer " + localStorage.getItem("token") },
    })
    .then((res) =>{
      setTitle(res.data.blog.title);
      setDescription(res.data.blog.description);
      setCategory(res.data.blog.category);
      setAuthor(res.data.blog.author);
      setLoading(false);
    }) .catch ((err) => {
      console.log(err.res.data);
    })
  };
  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  const fileHandler = (e) => {
    console.log(e.target.files[0]);
    setSelectdeFile(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const submit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("author", author);
    formData.append("photo", selectedFile);

    axios
      .put("http://localhost:5000/blog/" + params.id, formData, {
        headers: { authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(localStorage)
        console.log(res);
        setLoading(false);
        nevigate("/");
      })
      .catch((err) => {
        console.log(err);

        console.log("put err");
        setLoading(false);
      });
  };
  return (
    <>
      {isloading && (
        <div
          className="loader d-flex justify-content-center align-content-center"
          style={{ height: "100vh" }}
        >
          <img
            src={loader}
            alt=""
            style={{ width: "100px", height: "100px" }}
          />
        </div>
      )}
      {!isloading && (
        <div
          className="container d-flex flex-column justify-content-center mb-5"
          style={{ marginTop: "100px" }}
        >
          <Container className="d-flex flex-column">
            <h1>Update Your Blog</h1>
            <form
              className="d-flex flex-column w-100 "
              style={{ color: "#fff" }}
            >
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                placeholder="title"
                className="inputs mt-2 p-1 rounded border-light bg-transparent text-white"
              />

              <input
                type="text"
                name="category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                placeholder="category"
                className="inputs mt-2 p-1 rounded border-light bg-transparent text-white"
              />
              <textarea
                type="text"
                name="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                placeholder="description (minimum 100 words)"
                className="inputs mt-2 p-1 rounded border-light bg-transparent text-white"
              />
              <input
                type="text"
                name="author"
                value={author}
                onChange={(e) => {
                  setAuthor(e.target.value);
                }}
                placeholder="author"
                className="inputs mt-2 p-1 rounded border-light bg-transparent text-white"
              />
              <input
                type="file"
                className="inputs mt-2 p-1 rounded border-light bg-transparent text-white"
                name="image"
                onChange={(e) => {
                  fileHandler(e);
                }}
              />
              <div className="image py-2">
                <img
                  src={imageUrl}
                  style={{ width: "150px" }}
                  alt="upload image"
                />
              </div>
              <div className="submit_button d-flex justify-content-center">
                <button className="btn_submit" type="submit" onClick={submit}>
                  submit
                </button>
              </div>
              <br />
            </form>
          </Container>
        </div>
      )}
    </>
  );
};

export default EditBlog;
