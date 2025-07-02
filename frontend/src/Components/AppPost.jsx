import React, { useState } from "react";
import axios from "axios";
function AppPost() {
  const [postdata, setPostData] = useState({
    title: "",
    content: "",
  });
  const fetchdata = async () => {
    try {
      const result = await axios.post(
        "http://localhost:8080/api/post",
        postdata
      );
      console.log(result.data);
    } catch (error) {}
  };

  const handleChange = (e) => {
    setPostData({ ...postdata, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {

    e.preventDefault();
    console.log("ok")   
    setPostData({
      title: "",
      content: "",
    });

    fetchdata();
  };
  return (
    <div className="flex justify-center">
      <div className="flex flex-col p-4 w-1/3 shadow-gray-600 shadow-lg  ">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={postdata.title}
            required
            onChange={handleChange}
            placeholder="Write title"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <input
            type="text"
            name="content"
            value={postdata.content}
            required
            onChange={handleChange}
            placeholder="Write content"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
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
