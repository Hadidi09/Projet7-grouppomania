import React from 'react'
import { Link } from 'react-router-dom'
const Navigation = () => {
  return (
    <div>
      <ul className='d-flex justify-content-center navigation'>
        <Link to='/register'>
          <li>Register</li>
        </Link>
        <Link to='/Login'>
          <li>Login</li>
        </Link>
        <Link to='/chatroom'>
          <li>ChatRoom</li>
        </Link>
        <Link to='/connect'>
          <li>connect</li>
        </Link>
        <Link to='/profil'>
          <li>profil</li>
        </Link>
      </ul>
    </div>
  )
}

export default Navigation
