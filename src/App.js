import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Create from "./pages/Create";
import BlogDetails from "./pages/BlogDetails";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogList from "./pages/BlogList";

function App() {
	return (
		<div>
			<BrowserRouter>
				<div className="App">
					<Navbar />
				</div>
				<div className="main">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/create" element={<Create />} />
						<Route path="/posts" element={<BlogList />} />
						<Route path="/posts/:id" element={<BlogDetails />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Registration />} />
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
