import React, { useState } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";
function Registration() {
  const navigate=useNavigate()
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  });

  const fetchdata = async () => {
    try {
      const result = await axios.post(
        "http://localhost:8080/api/user",
        userData
      );
      console.log(result.data);
      navigate("/login"); 
      // Uncomment this if you want to clear the form after successful registration
      // setUserData({
      //   name: "",
      //   email: "",
      //   password: "",
      //   role: ""
      // });
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("ok");
    fetchdata();
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col p-4 w-1/3 shadow-gray-600 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={userData.name}
            required
            onChange={handleChange}
            placeholder="Enter the name"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <input
            type="text"
            name="email"
            value={userData.email}
            required
            onChange={handleChange}
            placeholder="Enter the email"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                name="role"
                id="userrole"
                value="user"
                required
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <label htmlFor="userrole" className="ml-2">User</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="role"
                id="adminrole"
                value="admin"
                required
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <label htmlFor="adminrole" className="ml-2">Admin</label>
            </div>
          </div>
          <input
            type="password"
            name="password"
            value={userData.password}
            required
            onChange={handleChange}
            placeholder="Enter the password"
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

export default Registration;