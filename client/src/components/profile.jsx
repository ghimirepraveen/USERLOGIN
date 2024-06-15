import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const TOKEN = localStorage.getItem("token");

      console.log("Token:", TOKEN);

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      };

      try {
        console.log("Headers:", headers);

        const response = await axios.get(
          "http://localhost:4000/api/auth/profile",
          { headers }
        );
        console.log("Response:", response.data);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        const errorMessage =
          error.response?.data?.error ||
          error.message ||
          "An error occurred while fetching the user data.";
        console.error("Error fetching user data:", errorMessage);
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleDelete = async () => {
    const TOKEN = localStorage.getItem("token");

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    };

    try {
      await axios.delete("http://localhost:4000/api/auth/delete", { headers });
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "An error occurred while deleting the account.";
      console.error("Error deleting account:", errorMessage);
      setError(errorMessage);
    }
  };
  const handelLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="text-green-500 text-3xl text-center mt-20">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-3xl text-center mt-20">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              ID:
            </label>
            <p className="text-sm text-gray-900">{user.id}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <p className="text-sm text-gray-900">{user.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <p className="text-sm text-gray-900">{user.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address:
            </label>
            <p className="text-sm text-gray-900">{user.address}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone:
            </label>
            <p className="text-sm text-gray-900">{user.phone}</p>
          </div>
        </div>
        <button
          onClick={handleDelete}
          className="w-full px-4 py-2 font-bold text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-4"
        >
          Delete Account
        </button>
        <button
          onClick={handelLogout}
          className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4"
        >
          Logout
        </button>

        {error && (
          <div className="text-red-500 text-sm mt-4">Error: {error}</div>
        )}
        <div>
          View all user list:- &nbsp;
          <Link to="/users" className="text-indigo-600">
            click here
          </Link>
          <br />
          only admin can view all user list
          <br />
          use <span className="text-red-500">email:abcd@gmail.com</span>
          <br />
          <span className="text-red-500"> password:abcd@gmail.com</span>
          &nbsp; while loging in
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
