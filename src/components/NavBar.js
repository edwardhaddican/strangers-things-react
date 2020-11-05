import react from 'react'
import {clearToken } from "../api";



const NavBar = (props) => {

  const setIsLoggedIn = props.setIsLoggedIn

  return (
    <div>
      <button
        onClick={() => {
          clearToken();
          setIsLoggedIn(false);
        }}
      >
        LOG OUT
          </button>
    </div>
  )

}

export default NavBar
