import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        setError(error);
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
      setError(error);
    }
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
      <div className="text-9xl bg-red-500 m-80">Error: {error.message}</div>
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
        {error && (
          <div className="text-red-500 text-sm mt-4">
            Error: {error.message}
          </div>
        )}
        <button
          onClick={handleDelete}
          className="w-full px-4 py-2 font-bold text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-4"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
