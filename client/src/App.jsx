import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Blog from "./components/blog/Blog";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./RootLayout";
import Header from "./components/header/Header";
import NewBlog from "./components/createNewBlog/NewBlog";
import ReadMore from "./components/readMore/ReadMore";
import EditBlog from "./components/editBlog/EditBlog";
import Dashbord from "./Dashbord";
import SingleCategory from "./components/singleCategory/SingleCategory";
import UserLogin from "./components/user/userLogin/UserLogin";
import UserRegister from "./components/user/userRegister/UserRegister";
import Nopage from "./components/noPage/Nopage";

function App() {
  const router = createBrowserRouter([
    { path: "/user/register", element: <UserRegister /> },
    { path: "/user/login", element: <UserLogin /> },
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "", element: <Dashbord /> },
        { path: "/", element: <Blog /> },
        { path: "/about", element: <Header /> },
        { path: "/add-blog", element: <NewBlog /> },
        { path: "readMore/:id", element: <ReadMore /> },
        { path: "editBlog/:id", element: <EditBlog /> },
        { path: "category/:category", element: <SingleCategory /> },
        { path: "/logout"},
        { path: "*", element: <Nopage /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
