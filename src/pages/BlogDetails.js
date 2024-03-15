import { useBlogsContext } from "../hooks/useBlogsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UpdateForm from "../components/UpdateForm";
import "./styles/BlogDetails.css";

const BlogDetails = () => {
	const { dispatch } = useBlogsContext();
	const { user } = useAuthContext();
	const { id } = useParams();
	const [blog, setBlog] = useState([]);
	const [selectedBlog, setSelectedBlog] = useState(null);
	const [isVisible, setIsVisible] = useState(true);
	const navigate = useNavigate();

	

	useEffect(() => {
		fetchPosts();
	}, []);

	const fetchPosts = () => {
		axios.get(`/api/posts/${id}`).then((res) => {
			setBlog(res.data);
			// console.log(res.data);
		});
	};

	const handleUpdateClick = () => {
		setIsVisible(!isVisible);
		setSelectedBlog(blog);
	};

	const handleUpdateDone = () => {
		setIsVisible(!isVisible);
		setSelectedBlog(null);
		alert("Blog updated successfully.")
		fetchPosts();
	};

	const handleDelete = async () => {
		if (!user) {
			alert("You must be logged in to delete.")
			return;
		}
		const response = await fetch(`/api/posts/${id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${user.token}`,
			},
		});
		const json = await response.json();

		if (response.ok) {
			dispatch({ type: "DELETE_BLOG", payload: json });
			alert("Blog deleted successfully.")
			navigate("/");
		}
	};

	return (
		<div className="blog-details">
			{selectedBlog === blog && (
				<UpdateForm
					id={id}
					initialTitle={blog.title}
					initialDescription={blog.description}
					initialAuthor={blog.author}
					onUpdate={handleUpdateDone}
				/>
			)}
			<h4>{blog.title}</h4>
			<p>{blog.author}</p>

			<br />

			<p>{blog.description}</p>
			<p>Likes: {blog.likes}</p>
			{isVisible && 
				<div>
					<button onClick={handleUpdateClick}>Update Blog</button>
					<button onClick={handleDelete}>Delete</button>
				</div>
			}
			
		</div>
	);
};

export default BlogDetails;
