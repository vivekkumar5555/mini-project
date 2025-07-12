import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AppPost() {
  const [postdata, setPostData] = useState({
    title: "",
    content: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchdata = async () => {
    try {
      // First verify authentication
      const authResponse = await axios.get(
        "http://localhost:8080/api/verify-auth", 
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Then create post
      const postResponse = await axios.post(
        "http://localhost:8080/api/post",
        postdata,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return postResponse.data;
    } catch (error) {
      console.error("Error details:", {
        status: error.response?.status,
        data: error.response?.data,
      });
      throw error;
    }
  };

  const getCookies = () => {
    const allCookies = document.cookie;
    console.log(allCookies); 
  }

  const handleChange = (e) => {
    setPostData({ ...postdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    getCookies();
    
    try {
      await fetchdata();
      setPostData({ title: "", content: "" });
      alert("Post created successfully!");
    } catch (error) {
      if (error.response?.status === 401) {
        setError("Session expired. Please login again.");
        navigate("/login");
      } else {
        setError(error.response?.data?.message || "Failed to create post");
      }
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col p-6 w-full max-w-md bg-white shadow-lg rounded-lg">
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={postdata.title}
            required
            onChange={handleChange}
            placeholder="Write title"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <textarea
            name="content"
            value={postdata.content}
            required
            onChange={handleChange}
            placeholder="Write content"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
            rows={4}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition-colors duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AppPost;
