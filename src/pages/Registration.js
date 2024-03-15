
import React, { useState } from "react";
import { useRegister } from "../hooks/useRegister";
import './styles/Registration.css'


const Registration = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { register, error, isLoading } = useRegister();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if(!username || !password) {
			alert("Please fill in all the details");
			return;
		} else {
			await register(username, password);
			alert("Account successfully created.");
		}
	};

	return (

		<div id="register-container">
			<div id="register-box">
				<form className="registration" onSubmit={handleSubmit}>
					<h3>Create an account</h3>
					<label>Username: </label>
					<input type="text" onChange={(e) => setUsername(e.target.value)} value={username} />
					<label>Password: </label>
					<input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />

					<button id="register-button" disabled={isLoading}>Register</button>
					{error && <div className="error">{error}</div>}
				</form>
			</div>
		</div>
		
	);
};

export default Registration;
