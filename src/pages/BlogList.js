import "./styles/BlogList.css";
import { Link } from "react-router-dom";
import { useBlogsContext } from "../hooks/useBlogsContext";

const BlogList = ({ blog }) => {
	const { dispatch } = useBlogsContext();

	const handleClick = async () => {
		const response = await fetch("/api/posts/" + blog._id, {
			method: "GET",
		});
		const json = await response.json();

		if (response.ok) {
			dispatch({ type: "GET_BLOG", payload: json });
		}
	};

	return (
		<div className="blogs">
			<Link to={`/posts/${blog._id}`}>
				<h4 onClick={handleClick} id="blog-title">{blog.title}</h4>
			</Link>
			<p>{blog.author}</p>
			<br />
			<p className="truncate">{blog.description}</p>

			<p>Likes: {blog.likes}</p>
		</div>
	);
};

export default BlogList;
