import { useContext } from "react";
import { useState } from "react";
import { DataContext } from "../../contexts/DataContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Input,
	Select,
	SelectItem,
	Textarea,
} from "@nextui-org/react";
import { MdClose, MdCheck } from "react-icons/md";

function MyJobs() {
	const [jobs, setJobs] = useState([]);
	const [editingMode, setEditingMode] = useState(null);
	const [category, setCategory] = useState("");
	const { isAuthorized, user } = useContext(DataContext);
	const navigate = useNavigate();

	useEffect(() => {
		const getMyJobs = async () => {
			try {
				const response = await axios.get(
					"http://localhost:5000/api/v1/job/my-jobs",
					{ withCredentials: true }
				);
				const data = await response.data;
				setJobs(data.myJobs);
			} catch (error) {
				toast.error(error.response.data.message);
				setJobs([]);
			}
		};
		getMyJobs();
	}, []);

	useEffect(() => {
		if (!isAuthorized || (user && user.role !== "Employer")) navigate("/");
	}, [isAuthorized, user]);

	const handleEnableEdit = (id) => setEditingMode(id);

	const handleDisableEdit = () => setEditingMode(null);

	const handleUpdate = async (id) => {
		const filterJob = jobs.find((job) => job._id === id);
		await axios
			.put(`http://localhost:5000/api/v1/job/update/${id}`, filterJob, {
				withCredentials: true,
			})
			.then((res) => toast.success(res.data.message))
			.catch((err) => toast.error(err.response.data.message));
	};
	const handleDelete = async (id) => {
		await axios
			.delete(`http://localhost:5000/api/v1/job/delete/${id}`, {
				withCredentials: true,
			})
			.then((res) => {
				toast.success(res.data.message);
				setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
			})
			.catch((err) => toast.error(err.response.data.message));
	};

	const handleInput = async (id, inputField, value) => {
		setJobs((prevJobs) =>
			prevJobs.map((job) =>
				job._id === id ? { ...job, [inputField]: value } : job
			)
		);
	};

	return (
		<section>
			<h1 className="font-bold text-3xl mb-5 tracking-widest">
				Your Posted Jobs
			</h1>
			{jobs && jobs.length > 0 ? (
				jobs.map((el) => {
					return (
						<>
							<div key={el._id} className="my-3">
								<Card
									key={el._id}
									shadow="none"
									className="border border-indigo-500"
								>
									<CardHeader className="text-start font-semibold text-indigo-500">
										<span>{el.title}</span>
									</CardHeader>
									<CardBody className="flex flex-col gap-3 ">
										{/* flex container */}
										<div className="grid grid-cols-2 gap-3">
											{/* Left side inputs */}
											<div>
												<span>
													<i>Category: </i>
													<Select
														isDisabled={editingMode !== el._id ? true : false}
														value={el.category}
														placeholder={el.category}
														onChange={(e) =>
															handleInput(el._id, "category", e.target.value)
														}
														radius="none"
													>
														<SelectItem
															className="text-neutral-600"
															key="Software Engineering"
															value={category}
														>
															Software Engineering
														</SelectItem>
														<SelectItem
															className="text-neutral-600"
															key="Frontend Web Development"
															value={category}
														>
															Frontend Web Development
														</SelectItem>
														<SelectItem
															className="text-neutral-600"
															key="Backend Development"
															value={category}
														>
															Backend Development
														</SelectItem>
														<SelectItem
															className="text-neutral-600"
															key="Artificial Intelligence"
															value={category}
														>
															Artificial Intelligence
														</SelectItem>
														<SelectItem
															className="text-neutral-600"
															key="Wordpress Development"
															value={category}
														>
															Wordpress Development
														</SelectItem>
														<SelectItem
															className="text-neutral-600"
															key="Video Editing"
															value={category}
														>
															Video Editing
														</SelectItem>
														<SelectItem
															className="text-neutral-600"
															key="Account and Finance"
															value={category}
														>
															Account and Finance
														</SelectItem>
														<SelectItem
															className="text-neutral-600"
															key="Mobile App Development"
															value="mobile app development"
														>
															Mobile App Development
														</SelectItem>
														<SelectItem
															className="text-neutral-600"
															key="Data Entry"
															value="data entry"
														>
															Data Entry
														</SelectItem>
													</Select>
												</span>
												<span>
													<i>Country: </i>
													<Input
														isDisabled={editingMode !== el._id ? true : false}
														value={el.country}
														onChange={(e) =>
															handleInput(el._id, "country", e.target.value)
														}
														radius="none"
													/>
												</span>
												<span>
													<i>City: </i>
													<Input
														isDisabled={editingMode !== el._id ? true : false}
														value={el.city}
														onChange={(e) =>
															handleInput(el._id, "city", e.target.value)
														}
														radius="none"
													/>
												</span>

												{el.fixedSalary ? (
													<span>
														<i>Salary: </i>
														<Input
															placeholder="Fixed Salary"
															isDisabled={editingMode !== el._id ? true : false}
															value={el.fixedSalary}
															onChange={(e) =>
																handleInput(
																	el._id,
																	"fixedSalary",
																	e.target.value
																)
															}
															radius="none"
														/>
													</span>
												) : (
													<span>
														<i>Salary: </i>{" "}
														<Input
															placeholder="From"
															isDisabled={editingMode !== el._id ? true : false}
															value={el.salaryFrom}
															onChange={(e) =>
																handleInput(
																	el._id,
																	"salaryFrom",
																	e.target.value
																)
															}
															radius="none"
														/>
														<Input
															placeholder="To"
															isDisabled={editingMode !== el._id ? true : false}
															value={el.salaryTo}
															onChange={(e) =>
																handleInput(el._id, "salaryTo", e.target.value)
															}
															radius="none"
														/>
													</span>
												)}
												<span>
													<i>Expired: </i>

													<Select
														label="Selecting true will be hide the job from listing"
														radius="none"
														isDisabled={editingMode !== el._id ? true : false}
														placeholder={el.expired}
														value={el.expired}
														onChange={(e) =>
															handleInput(
																el._id,
																"expired",
																e.target.value === "true"
															)
														}
													>
														<SelectItem
															className="text-neutral-600"
															key={true}
															value={true}
														>
															true
														</SelectItem>
														<SelectItem
															className="text-neutral-600"
															key={false}
															value={false}
														>
															false
														</SelectItem>
													</Select>
												</span>
											</div>
											{/* Right side inputs */}
											<div>
												<span>
													<i>Description: </i>
													<Textarea
														rows="5"
														isDisabled={editingMode !== el._id ? true : false}
														value={el.description}
														onChange={(e) =>
															handleInput(el._id, "description", e.target.value)
														}
														radius="none"
													/>
												</span>
												<span>
													<i>Location: </i>
													<Textarea
														isDisabled={editingMode !== el._id ? true : false}
														value={el.location}
														onChange={(e) =>
															handleInput(el._id, "location", e.target.value)
														}
														radius="none"
													/>
												</span>
												{/* Buttons wrapper div */}
												<div className="text-center relative flex items-end justify-center py-12">
													{editingMode === el._id ? (
														<>
															<Button
																onClick={() => handleDisableEdit()}
																className="m-1"
																variant="shadow"
																color="danger"
																radius="full"
																isIconOnly
																size="md"
																aria-label="Delete this Job post"
															>
																<MdClose />
															</Button>
															<Button
																onClick={() => handleUpdate(el._id)}
																className="m-1 text-white"
																variant="shadow"
																color="success"
																radius="full"
																isIconOnly
																size="md"
																aria-label="Update this Job post"
															>
																<MdCheck />
															</Button>
														</>
													) : (
														<>
															<Button
																onClick={() => handleEnableEdit(el._id)}
																variant="shadow"
																color="warning"
																radius="full"
																className="m-1"
																size="md"
															>
																Edit
															</Button>
															<Button
																onClick={() => {
																	if (confirm("Are you sure?"))
																		handleDelete(el._id);
																}}
																variant="shadow"
																color="danger"
																radius="full"
																className="m-1"
																size="md"
															>
																Delete
															</Button>
														</>
													)}
												</div>
											</div>
										</div>
									</CardBody>
									<CardFooter></CardFooter>
								</Card>
							</div>
						</>
					);
				})
			) : (
				<p>You've not posted any job or may be you deleted all of your jobs!</p>
			)}
		</section>
	);
}

export default MyJobs;
