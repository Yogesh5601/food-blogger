import { React } from "react";
import { Link, useNavigate } from "react-router-dom";

const CategoryCard = ({ category }) => {
  
  const nevigate = useNavigate();
  const singleCategory = (category) => {
    console.log(category);
    nevigate("/category/" + category);
  };

  return (
    <>
      <div className="categoryCard col-12 col-sm-6 col-md-3 col-lg-2 p-2">
        <Link
          onClick={() => {
            singleCategory(category.category);
          }}
          className="category_link d-flex w-100"
        >
          <img
            src="https://plus.unsplash.com/premium_photo-1692872337283-4fae5a90fb05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80"
            alt=""
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              gap: "10px",
            }}
          />
          {category.category}
        </Link>
      </div>
    </>
  );
};

export default CategoryCard;
