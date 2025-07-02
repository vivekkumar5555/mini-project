import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { handleSuccess, handleError } from "../assets/Toaster";

function UpdatePost() {
  const [updatedata, setUpdateData] = useState({
    title: "",
    content: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchdata = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/user/${id}`);
      setUpdateData({
        title: result.data.getpost.title,
        content: result.data.getpost.content,
      });

    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        handleError(error.response.data.message);
      } else {
        handleError("Failed to fetch post data");
      }
    }
  };

  const updatedpost = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/user/${id}`, updatedata);
      
      if (response.data && response.data.message) {
        handleSuccess(response.data.message);
      }
      setTimeout(() => {
         navigate("/"); 
      },1000);
     
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        handleError(error.response.data.message);
      } else {
        handleError("Failed to update post");
      }
    }
  };

  useEffect(() => {
    fetchdata();
  }, [id]);

  const handleChange = (e) => {
    setUpdateData({ ...updatedata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatedpost();
  };

  return (
    <>
      <ToastContainer/>
      <div className="flex justify-center mt-10">
        <div className="flex flex-col p-4 w-1/3 shadow-gray-600 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              required
              value={updatedata.title}
              onChange={handleChange}
              placeholder="Write title"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
              
            />
            <input
              type="text"
              name="content"
              value={updatedata.content}
              onChange={handleChange}
              placeholder="Write content"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition-colors duration-200"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdatePost;