import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Divider,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext";
import { useContext } from "react";
import axios from "axios";
import Btn from "../common/Button";

function JobDetails() {
	const [job, setJob] = useState({});
	const { id } = useParams();
	const navigateTo = useNavigate();

	const { isAuthorized, user } = useContext(DataContext);

	useEffect(() => {
		axios
			.get(`https://job-bucket-server.onrender.com/api/v1/job/${id}`, {
				withCredentials: true,
			})
			.then((res) => {
				setJob(res.data.job);
			})
			.catch((error) => {
				navigateTo("/notfound");
			});
	}, []);

	if (!isAuthorized) {
		navigateTo("/login");
	}
	return (
		<section className="w-full">
			<Card shadow="none" className="bg-inherit">
				<CardHeader>
					<h1>
						<b>Job Details</b>
					</h1>
				</CardHeader>
				<Divider className="my-4" />
				<CardBody className="tracking-wide">
					<p>
						Title: <span> {job.title}</span>
					</p>
					<p>
						Category: <span>{job.category}</span>
					</p>
					<p>
						Country: <span>{job.country}</span>
					</p>
					<p>
						City: <span>{job.city}</span>
					</p>
					<p>
						Location: <span>{job.location}</span>
					</p>
					<p>
						Description: <span>{job.description}</span>
					</p>
					<p>
						Job Posted On:{" "}
						<span>{new Date(job.jobPostedOn).toLocaleString()}</span>
					</p>
					<p>
						Salary:{" "}
						{job.fixedSalary ? (
							<span>{job.fixedSalary}</span>
						) : (
							<span>
								{job.salaryFrom} - {job.salaryTo}
							</span>
						)}
					</p>
				</CardBody>
				<CardFooter>
					{user && user.role === "Employer" ? (
						<></>
					) : (
						<Btn
							to={`/application/${job._id}`}
							size="sm"
							text="Apply this Job"
						/>
					)}
				</CardFooter>
			</Card>
		</section>
	);
}

export default JobDetails;
