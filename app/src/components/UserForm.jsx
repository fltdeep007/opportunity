import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useForm } from "react-hook-form";

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAddMode = !id;
  const { fetchUser, addUser, updateUser } = useContext(UserContext);
  const [loading, setLoading] = useState(isAddMode ? false : true);
  const [error, setError] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (!isAddMode) {
      const getUser = async () => {
        try {
          const user = await fetchUser(id);
          if (user) {
            const formData = {
              firstname: user.name?.firstname || "",
              lastname: user.name?.lastname || "",
              email: user.email || "",
              phone: user.phone || "",
              street: user.address?.street || "",
              city: user.address?.city || "",
              zipcode: user.address?.zipcode || "",
            };
            reset(formData);
          } else {
            setError("User not found");
          }
        } catch (err) {
          setError("Error fetching user data");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      getUser();
    }
  }, [id, isAddMode, fetchUser, reset]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const userData = {
        name: {
          firstname: data.firstname,
          lastname: data.lastname,
        },
        email: data.email,
        phone: data.phone,
        address: {
          street: data.street,
          city: data.city,
          zipcode: data.zipcode,
        },
      };

      console.log("Submitting User Data:", userData); // Debugging

      if (isAddMode) {
        const newUser = await addUser(userData);
        if (newUser) {
          console.log("User Added Successfully:", newUser);
          navigate("/users");
        } else {
          console.error("Failed to add user");
          setError("Failed to add user. Please try again.");
        }
      } else {
        await updateUser(id, userData);
        navigate(`/users/${id}`);
      }
    } catch (err) {
      setError(`Failed to ${isAddMode ? "add" : "update"} user`);
      console.error("Error in onSubmit:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <Link to="/users" className="text-blue-500 hover:text-blue-700">
          ← Back to Users
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">
            {isAddMode ? "Add New User" : "Edit User"}
          </h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  className={`w-full p-2 border rounded ${
                    errors.firstname ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("firstname", { required: "First name is required" })}
                />
                {errors.firstname && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstname.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  className={`w-full p-2 border rounded ${
                    errors.lastname ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("lastname", { required: "Last name is required" })}
                />
                {errors.lastname && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastname.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className={`w-full p-2 border rounded ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Phone</label>
              <input type="text" className="w-full p-2 border rounded border-gray-300" {...register("phone")} />
            </div>

            <div className="border-t pt-4">
              <h2 className="text-xl font-semibold mb-4">Address Information</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Street</label>
                  <input type="text" className="w-full p-2 border rounded border-gray-300" {...register("street")} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">City</label>
                    <input type="text" className="w-full p-2 border rounded border-gray-300" {...register("city")} />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Zipcode</label>
                    <input type="text" className="w-full p-2 border rounded border-gray-300" {...register("zipcode")} />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Link to="/users" className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded">
                Cancel
              </Link>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
