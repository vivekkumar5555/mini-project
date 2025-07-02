import React from 'react'
import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <div>
        <Link to="/updatePost/:id" >UpdatePost</Link>
        <Link to="/">GetPost</Link>

      
    </div>
  )
}

export default Navbar