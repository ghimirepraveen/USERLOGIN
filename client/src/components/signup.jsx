import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const navigateTo = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    address: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    name: "",
    address: "",
    phone: "",
    password: "",
  });

  const [backendError, setBackendError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const emailValidation = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const nameValidation = (name) => {
    const re = /^[a-zA-Z\s]+$/;
    return re.test(name);
  };

  const phoneValidation = (phone) => {
    const re = /^[0-9]+$/;
    return re.test(phone);
  };

  const passwordValidation = (password) => {
    return password.length >= 8 && password.length <= 20;
  };

  const validate = () => {
    let errors = {
      email: "",
      name: "",
      address: "",
      phone: "",
      password: "",
    };

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!emailValidation(formData.email)) {
      errors.email = "Invalid email";
    }

    if (!formData.name) {
      errors.name = "Name is required";
    } else if (!nameValidation(formData.name)) {
      errors.name = "Name can only contain letters and spaces";
    }

    if (!formData.phone) {
      errors.phone = "Phone number is required";
    } else if (!phoneValidation(formData.phone)) {
      errors.phone = "Phone number can only contain numbers";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (!passwordValidation(formData.password)) {
      errors.password = "Password must be between 8 to 20 characters";
    }

    setErrors(errors);

    return Object.values(errors).every((error) => error === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();

    if (isValid) {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/auth/signup",
          formData
        );

        console.log("Response:", response.data);

        navigateTo("/login");
      } catch (error) {
        if (error.response) {
          const backendErrorMessage =
            error.response.data?.error || "An error occurred";
          console.log("Backend error:", backendErrorMessage);

          setBackendError(backendErrorMessage);
        } else {
          setBackendError("An error occurred while submitting the form");
        }
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
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
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.phone && <p className="text-red-500">{errors.phone}</p>}
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
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </div>

          {backendError && (
            <p className="mt-4 text-red-500 text-center">{backendError}</p>
          )}
        </form>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
