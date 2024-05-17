import { BrowserRouter, Route, Routes } from "react-router-dom";
//import SignUpForm from "./components/signup";
import LoginForm from "./components/login";

function App() {
  return (
    <>
      <BrowserRouter>
        <LoginForm />
        <Routes>
          <Route path="/" element={<LoginForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
