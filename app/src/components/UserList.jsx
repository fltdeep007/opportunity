import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const UserList = () => {
  const { users, loading, error, deleteUser } = useContext(UserContext);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await deleteUser(id);
    }
  };

  if (loading) return <div className="flex justify-center p-8"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>;
  if (error) return <div className="text-red-500 p-4 text-center">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <Link
          to="/add-user"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded shadow"
        >
          Add New User
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.length > 0 ? (
          users.map(user => (
            <div
              key={user.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-4 flex items-center space-x-4">
                <img
                  src={user.image || `https://randomuser.me/api/portraits/${user.id % 2 === 0 ? 'men' : 'women'}/${user.id % 10 || 10}.jpg`}
                  alt={`${user.name?.firstname || 'User'}`}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold">
                    {user.name?.firstname} {user.name?.lastname}
                  </h2>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
              
              <div className="border-t px-4 py-3 bg-gray-50 flex justify-between">
                <Link
                  to={`/users/${user.id}`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  View Details
                </Link>
                <div className="space-x-2">
                  <Link
                    to={`/users/${user.id}/edit`}
                    className="text-yellow-500 hover:text-yellow-700"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-10">
            <p className="text-gray-500">No users found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;