import { useState, useEffect } from "react";
import axios from "axios";

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      const TOKEN = localStorage.getItem("token");

      console.log("Token:", TOKEN);

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      };

      try {
        const response = await axios.get(
          `http://localhost:4000/api/auth/allusers?page=${currentPage}&limit=5`,
          { headers }
        );

        const { users = [], totalPages = 1 } = response.data;
        setUsers(Array.isArray(users) ? users : []);
        setTotalPages(totalPages);
        setLoading(false);
      } catch (error) {
        if (error.response) {
          const backendErrorMessage =
            error.response.data?.error || "An error occurred";
          console.log("Backend error:", backendErrorMessage);
          setError(backendErrorMessage);
        } else {
          setError("An error occurred while fetching users");
        }
        setLoading(false);
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
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
      <div className="text-red-500 text-3xl text-center mt-20">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-5xl p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">User List</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Address</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Created At</th>
              <th className="border px-4 py-2">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.address}</td>
                <td className="border px-4 py-2">{user.phone}</td>
                <td className="border px-4 py-2">{user.role}</td>
                <td className="border px-4 py-2">
                  {new Date(user.createdAt).toLocaleString()}
                </td>
                <td className="border px-4 py-2">
                  {new Date(user.updatedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-xl">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserListPage;
