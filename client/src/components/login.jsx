import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [backendError, setBackendError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/signin",
        formData
      );

      localStorage.setItem("token", response.data.token);

      navigate("/profile");
    } catch (error) {
      if (error.response) {
        const backendErrorMessage =
          error.response.data?.error || "An error occurred";
        console.log("Backend error:", backendErrorMessage);

        setBackendError(backendErrorMessage);
      } else {
        setBackendError("An error occurred while submitting the form");
      }

      console.error("Error submitting the form", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-sm text-center">
          Don&apos;t have an account?{" "}
          <Link to="/" className="text-indigo-600">
            Sign up
          </Link>
        </p>

        {backendError && (
          <div className="text-red-500 text-sm mt-4">Error: {backendError}</div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
