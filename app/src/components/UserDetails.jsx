import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchUser, deleteUser } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const userData = await fetchUser(id);
        if (userData) {
          setUser(userData);
        } else {
          setError('User not found');
        }
      } catch (err) {
        setError('Failed to fetch user details');
      } finally {
        setLoading(false);
      }
    };

    getUserDetails();
  }, [id, fetchUser]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const result = await deleteUser(id);
      if (result.success) {
        navigate('/users');
      }
    }
  };

  if (loading) return <div className="flex justify-center p-8"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>;
  if (error) return <div className="text-red-500 p-4 text-center">{error}</div>;
  if (!user) return <div className="text-center p-4">User not found</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <Link to="/users" className="text-blue-500 hover:text-blue-700">
          ← Back to Users
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 flex flex-col md:flex-row">
          <div className="md:w-1/3 flex justify-center md:justify-start mb-4 md:mb-0">
            <img
              src={user.image || `https://randomuser.me/api/portraits/${user.id % 2 === 0 ? 'men' : 'women'}/${user.id % 10 || 10}.jpg`}
              alt={`${user.name?.firstname || 'User'}`}
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
          
          <div className="md:w-2/3">
            <h1 className="text-2xl font-bold mb-4">
              {user.name?.firstname} {user.name?.lastname}
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h2 className="text-gray-500">Contact Information</h2>
                <p className="mt-2">
                  <span className="font-semibold">Email:</span> {user.email}
                </p>
                <p className="mt-1">
                  <span className="font-semibold">Phone:</span> {user.phone || 'N/A'}
                </p>
              </div>
              
              <div>
                <h2 className="text-gray-500">Address</h2>
                <p className="mt-2">
                  <span className="font-semibold">Street:</span> {user.address?.street || 'N/A'}
                </p>
                <p className="mt-1">
                  <span className="font-semibold">City:</span> {user.address?.city || 'N/A'}
                </p>
                <p className="mt-1">
                  <span className="font-semibold">Zipcode:</span> {user.address?.zipcode || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-3 bg-gray-50 flex justify-end space-x-2">
          <Link
            to={`/users/${user.id}/edit`}
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;