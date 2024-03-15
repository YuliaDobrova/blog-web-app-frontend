import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Create.css";
import { useAuthContext } from "../hooks/useAuthContext";

const Create = () => {
	const { user } = useAuthContext();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [author, setAuthor] = useState("");
	const [error, setError] = useState(null);
	const [likes, setLikes] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!user) {
			setError("You must be logged in to create a post");
			return;
		}
		const blog = { title, description, author, likes };



		const response = await fetch("/api/posts", {
			method: "POST",
			body: JSON.stringify(blog),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${user.token}`,
			},
		});
		setIsLoading(true);
		const json = await response.json();

		if (!response.ok) {
			setError(json.error);
		}

		// const json = await response.json();

		if (response.ok) {
			setTitle("");
			setDescription("");
			setAuthor("	");
			setLikes(0);
			setError(null);
			console.log("new blog added");
			setIsLoading(false);
			alert("Blog created successfully.")
			navigate("/");
		}
	};

	return (
		<div className="create">
			<h2>Add a New Blog</h2>
			<form onSubmit={handleSubmit}>
				<label>Blog Title: </label>
				<input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />
				<label>Blog body: </label>
				<textarea required rows={4} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
				<label>Blog author: </label>
				<input type="text" required value={author} onChange={(e) => setAuthor(e.target.value)} />
				<label>Likes: </label>
				<input type="number" required value={likes} onChange={(e) => setLikes(e.target.value)} />
				{!isLoading && <button>Add Blog</button>}
				{isLoading && <button disabled>Adding Blog...</button>}
				{error && <div className="error">{error}</div>}
			</form>
		</div>
	);
};

export default Create;
