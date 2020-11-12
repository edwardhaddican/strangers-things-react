import react from "react";
import { clearToken } from "../api";
import { Link } from "react-router-dom";
import FilterPosts from './FilterPosts'
import "./NavBar.css";

const NavBar = (props) => {
  const setIsLoggedIn = props.setIsLoggedIn;

  return (
    <div className="nav-bar-container">
      <div className="link-container">
        <div>
          <Link to="/posts" className="nav-item">
            All Posts
          </Link>
        </div>
        <div>
          <Link to="/posts/create" className="nav-item">
            New Post
          </Link>
        </div>
        <div>
          <FilterPosts/>
        </div>
      </div>
      <div className="logout-button">
        <button
          onClick={() => {
            clearToken();
            setIsLoggedIn(false);
          }}
        >
          LOG OUT
        </button>
      </div>
    </div>
  );
};

export default NavBar;
