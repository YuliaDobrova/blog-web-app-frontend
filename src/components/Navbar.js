import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
	const { logout } = useLogout();
	const { user } = useAuthContext();

	const handleClick = () => {
		logout();
		alert("Logged out successfully.")
	};

	return (
		<nav className="navbar">
			<h1>OneCodeCamp Blog</h1>
			<div className="links">
				{user && (
					<div>
						<Link to="/">Home</Link> |
						<Link to="/create">New Blog</Link> | 
						<Link onClick={handleClick}>Logout</Link> |
						<span> {user.username}</span>
					</div>
				)}
				{!user && (
					<div>
						<Link to="/">Home</Link> |
						<Link to="/login">Login</Link> |
						<Link to="/register">Register</Link>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
