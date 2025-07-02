import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppPost from "./AppPost";
import { ToastContainer, toast } from "react-toastify";
import { handleSuccess, handleError } from "../assets/Toaster";

function GetPost() {
  const [store, setStore] = useState([]);
  const navigate = useNavigate();

  const fetchdata = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/post");
      const resultData = result.data.getpost;
      setStore(resultData);
      if (result.data && result.data.message) {
        // handleSuccess(result.data.message);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        handleError(error.response.data.message);
      } else {
        handleError("Failed to fetch posts");
      }
    }
  };

  useEffect(() => {
    fetchdata();
  });

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/user/${id}`
      );
      if (response) {
        handleSuccess(response.data.message);
      }
      fetchdata();
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        handleError(error.response.data.message);
      } else {
        handleError("Failed to delete post");
      }
    }
  };

  return (
    <div>
      <ToastContainer />
      <AppPost />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {store.map((stor, index) => (
          <div
            className="border-2 border-gray-300 rounded-lg p-5 bg-white shadow-md hover:shadow-lg transition-shadow duration-200"
            key={index}
          >
            <h2 className="text-2xl font-bold text-amber-500 mb-2">
              {stor.title}
            </h2>
            <p className="text-gray-700 mb-4">{stor.content}</p>
            <div className="flex space-x-2">
              <button
                className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition-colors duration-200"
                onClick={() => navigate(`/updatePost/${stor._id}`)}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(stor._id)}
                className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GetPost;
