import { useContext, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Button,
} from "@nextui-org/react";
import { DataContext } from "../../contexts/DataContext";
import { Link, useNavigate } from "react-router-dom";

const getRandomColor = () => {
	const colors = [
		"bg-red-500",
		"bg-blue-500",
		"bg-green-500",
		"bg-yellow-500",
		"bg-purple-500",
	]; // Add more colors if needed
	const randomIndex = Math.floor(Math.random() * colors.length);
	return colors[randomIndex];
};
function AllJobs() {
	const [jobs, setJobs] = useState([]);
	const [jobColors, setJobColors] = useState({});
	const { isAuthorized } = useContext(DataContext);
	const navigate = useNavigate();

	// Generate and store random color for each job
	const initializeJobColors = () => {
		const colors = {};
		jobs.forEach((job) => {
			colors[job._id] = getRandomColor();
		});
		setJobColors(colors);
	};

	// Initialize random colors on component mount
	useEffect(() => {
		initializeJobColors();
	}, [jobs]); // Re-initialize colors if jobs change

	useEffect(() => {
		try {
			const getJobs = async () => {
				const response = await axios.get(
					"https://job-bucket-server.onrender.com/api/v1/job/all-jobs",
					{ withCredentials: true }
				);
				const data = await response.data;
				setJobs(data.jobs);
			};
			getJobs();
		} catch (error) {
			console.log(error);
		}
	}, []);

	if (!isAuthorized) navigate("/");

	return (
		<section>
			<h1 className="font-bold text-3xl mb-5 tracking-widest">
				All Available Jobs
			</h1>
			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 py-20 px-3">
				{jobs &&
					jobs?.map((job) => {
						return (
							<Card
								key={job._id}
								className="hover:shadow-md border hover:border-none"
								shadow="none"
							>
								<CardHeader className={`${jobColors[job._id]} text-white`}>
									<b>{job.title}</b>
								</CardHeader>
								<CardBody>
									<p>Category: {job.category}</p>
									<p>Country: {job.country}</p>
									<p>Location: {job.location}</p>
								</CardBody>
								<CardFooter>
									<Button
										as={Link}
										to={`/job/${job._id}`}
										radius="full"
										variant="shadow"
										size="md"
									>
										See Details
									</Button>
								</CardFooter>
							</Card>
						);
					})}
			</div>
		</section>
	);
}

export default AllJobs;
