import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import pictureIcon from "../../assets/picture-icon.png";
import loader from "../../assets/loader.gif";

const NewBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState();
  const [selectedCate, setSelectedCate] = useState([])
  const [author, setAuthor] = useState("");
  const [selectedFile, setSelectdeFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(pictureIcon);
  const [isloading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fileHandler = (e) => {
    console.log(e.target.files[0]);
    setSelectdeFile(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const submit = (event) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("author", author);
    formData.append("category", category);
    formData.append("photo", selectedFile);
    axios
      .post("http://localhost:5000/blog", formData,{headers:{ Authorization:"Bearer" + localStorage.getItem("token")}})
      .then((res) => {
          setHasError(false);
          setLoading(true);
        console.log(res);
        navigate("/");
      })
      .catch((error) => {
         setLoading(true);
        console.log(error.response.data.message);
       setHasError(true);
       setLoading(false)
        setError(error.response.data.message);
      });
    event.preventDefault();
  };

  const getData = async () => {
     await axios.get("http://localhost:5000/category/")
    .then ((res) => {
      console.log(res);
      setSelectedCate(res.data.category);
    }) .catch ((error) => {
      console.log(error.response.message);
    })
  };
  useEffect(() => {
    getData();
    console.log(localStorage.email)
    setAuthor(localStorage.email);
  }, []);

  return (
    <>
      {isloading && (
        <div
          className="loader d-flex justify-content-center align-content-center mt-5"
          style={{ marginTop: "100px" }}
        >
          <img
            src={loader}
            alt=""
            style={{ width: "100px", height: "100px" }}
          />
        </div>
      )}
      {!isloading && !hasError && (
        <div
          className="newBlog d-flex flex-column justify-content-center mb-5"
          style={{height:"100vh" }}
        >
          <Container className="d-flex flex-column">
            <h1 className="title">Add new blog</h1>
            <form
              className="d-flex flex-column w-100 "
              style={{ color: "#fff" }}
            >
              <div className="errror">{error}</div>
              <input
                type="text"
                name="title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                placeholder="title"
                className="inputs mt-2 p-1  rounded border-light bg-transparent text-white"
              />

              <div className="selectcate mt-2">
                <select
                  className="cate w-100 bg-transparent text-white rounded border-light p-1"
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  <option className="bg-dark">
                    Please choose one Category
                  </option>
                  {selectedCate.map((category, index) => (
                    <option className="bg-dark" key={index}>
                      {category.category}
                    </option>
                  ))}
                </select>
              </div>

              <textarea
                type="text"
                name="description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                placeholder="description (minimum 100 words)"
                className="inputs mt-2 p-1  rounded border-light bg-transparent text-white"
              />
              <input
                type="text"
                name="author"
                onChange={(e) => {
                  setAuthor(e.target.value);
                }}
                placeholder={author}
                className="inputs mt-2 p-1  rounded border-light bg-transparent text-white"
              />
              <input
                type="file"
                className="inputs mt-2 p-1  rounded border-light bg-transparent text-white"
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
                <button
                  className="btn_submit p-2"
                  type="submit"
                  onClick={submit}
                >
                  submit
                </button>
              </div>
              <br />
            </form>
          </Container>
        </div>
      )}
      {hasError && (
      <h1>error {error}</h1>
      )}
    </>
  );
};

export default NewBlog;
