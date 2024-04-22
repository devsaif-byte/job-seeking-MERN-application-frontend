import "./App.css";
import { useContext, useEffect } from "react";
import { DataContext } from "./contexts/DataContext";
import axios from "axios";
import NavTop from "./components/layout/NavTop";
import Footer from "./components/layout/Footer";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./components/home/Home.jsx";
import NotFound from "./components/errors/NotFound.jsx";
import MyApplications from "./components/applications/MyApplications.jsx";
import Login from "./components/auth/Login.jsx";
import Register from "./components/auth/Register.jsx";
import AllJobs from "./components/jobs/AllJobs.jsx";
import JobDetails from "./components/jobs/JobDetails.jsx";
import Application from "./components/applications/Application.jsx";
import PostJob from "./components/jobs/PostJob.jsx";
import MyJobs from "./components/jobs/MyJobs.jsx";
function App() {
	const { isAuthorized, setIsAuthorized, setUser } = useContext(DataContext);
	console.log("Authorized?:", isAuthorized);
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await axios.get(
					"https://job-bucket-server.onrender.com/api/v1/user/get-user",
					{ withCredentials: true }
				);
				const data = await response.data;
				setUser(data.user);
				setIsAuthorized(true);
			} catch (error) {
				setIsAuthorized(false);
			}
		};
		fetchUser();
	}, []);

	return (
		<BrowserRouter>
			<div className="flex flex-col bg-[#FAF9FA]">
				<NavTop />

				<div className="flex min-h-dvh flex-col flex-grow container max-w-6xl mx-auto py-20 px-5">
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/" element={<Home />} />
						<Route path="/job/all" element={<AllJobs />} />
						<Route path="/job/:id" element={<JobDetails />} />
						<Route path="/applications/:id" element={<Application />} />
						<Route path="/applications-me" element={<MyApplications />} />
						<Route path="/job/post" element={<PostJob />} />
						<Route path="/job/me" element={<MyJobs />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</div>
				<Footer />
				<Toaster />
			</div>
		</BrowserRouter>
	);
}

export default App;
