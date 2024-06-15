import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUpForm from "./components/signup";
import LoginForm from "./components/login";
import ProfilePage from "./components/profile";
import Footer from "./components/footer";
import Userlist from "./components/getallprofile";

function App() {
  return (
    <>
      <BrowserRouter>
        <header className="bg-gray-800 text-white p-4 text-center w-full">
          <h1 className="text-2xl font-bold">User Management System</h1>
        </header>
        <Routes>
          <Route path="/" element={<SignUpForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/users" element={<Userlist />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
