import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import AddNews from "./Pages/AddNews";
import NewsDescription from "./Pages/NewsDescription";
import LandingPage from "./Pages/LandingPage";
import PostedNewItems from "./Pages/PostedNewItems";
import EditNews from "./Pages/EditNews";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
function App() {
  // const navigate = useNavigate()

  return (
    <>
      {/* <BrowserRouter> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddNews />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit/:newsid"
          element={
            <ProtectedRoute>
              <EditNews />
            </ProtectedRoute>
          }
        />

        <Route
          path="/posted"
          element={
            <ProtectedRoute>
              <PostedNewItems />
            </ProtectedRoute>
          }
        />

        <Route
          path="/newsdesc/:newsid"
          element={
            <ProtectedRoute>
              <NewsDescription />
            </ProtectedRoute>
          }
        />
      </Routes>
      {/* </BrowserRouter> */}
    </>
  );
}

export default App;

export const ProtectedRoute = ({ children }) => {
  if (localStorage.getItem("xcitesporty-user")) {
    return children;
  } else {
    return <Navigate to={"/"} />;
  }
};
