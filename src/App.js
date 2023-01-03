import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import LeftBar from "./components/LeftBar/LeftBar";
import RightBar from "./components/RightBar/RightBar";
import "./style.scss";

function App() {

  const currentUser = true;

  const Layout = () => {
    return (
      <div className="theme-dark">
        <NavBar />
        <div style={{display: "flex"}}>
          <LeftBar />
          <div style={{flex: 6}}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    )
  };

  const ProtectedRoute = ({children}) => {
    if (!currentUser) {
      return <Navigate to="/login"/>
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute><Layout /></ProtectedRoute>,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/profile/:id",
          element: <Profile />
        }
      ]
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
]);

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
