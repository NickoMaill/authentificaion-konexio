import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Admin from "./views/Admin";
import Login from "./views/Login";
import SignUp from "./views/SignUp";

export default function App() {
  return (
    <>
      <BrowserRouter>

        <header>
          <Link to="/">Admin |</Link>
          <Link to="/login">Login |</Link>
          <Link to="/signup">Sign Up |</Link>
        </header>

        <Routes>
          <Route exact path="/" element={<Admin/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/signup" element={<SignUp/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
