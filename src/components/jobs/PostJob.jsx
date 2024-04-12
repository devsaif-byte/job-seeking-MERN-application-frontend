import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Select,
	Input,
	Button,
	SelectItem,
	Textarea,
} from "@nextui-org/react";
import { MainLogo } from "../common/Logo";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";
import { Link } from "react-router-dom";

function PostJob() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [country, setCountry] = useState("");
	const [city, setCity] = useState("");
	const [location, setLocation] = useState("");
	const [salaryFrom, setSalaryFrom] = useState("");
	const [salaryTo, setSalaryTo] = useState("");
	const [fixedSalary, setFixedSalary] = useState("");
	const [salaryType, setSalaryType] = useState("default");
	const { isAuthorized, user } = useContext(DataContext);

	const handleJobPost = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"http://localhost:5000/api/v1/job/post",
				fixedSalary.length >= 4
					? {
							title,
							description,
							category,
							country,
							city,
							location,
							fixedSalary,
							// eslint-disable-next-line no-dupe-keys
							description,
					  }
					: {
							title,
							description,
							category,
							country,
							city,
							location,
							salaryFrom,
							salaryTo,
							// eslint-disable-next-line no-dupe-keys
							description,
					  },
				{
					withCredentials: true,
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const data = response.data;
			toast.success(data.message);
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};
	return (
		<Card
			shadow="none"
			className="flex xs:w-full md:w-96 lg:w-full m-auto flex-wrap md:flex-nowrap gap-4"
		>
			<CardHeader>
				<MainLogo />
				<h3 className="font-bold">Post New Job</h3>
			</CardHeader>
			<CardBody className="">
				<form className="flex flex-col gap-3" action="">
					<Input
						type="text"
						label="Job Title"
						radius="full"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<Select
						radius="full"
						label="Select Category"
						placeholder="Select a Category"
						selectedKeys={[category]}
						onChange={(e) => setCategory(e.target.value)}
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
					<p className="text-small text-yellow-600 ml-3">
						Selected: {category}
					</p>
					<Input
						type="text"
						label="Country"
						radius="full"
						onChange={(e) => setCountry(e.target.value)}
					/>
					<Input
						type="text"
						label="City"
						radius="full"
						onChange={(e) => setCity(e.target.value)}
					/>
					<Input
						type="text"
						label="Location"
						radius="full"
						onChange={(e) => setLocation(e.target.value)}
					/>
					<Select
						value={salaryType}
						onChange={(e) => setSalaryType(e.target.value)}
						radius="full"
						label="SalaryType"
						placeholder="Select a type"
						selectedKeys={[salaryType]}
					>
						<SelectItem
							className="text-neutral-600"
							key="default"
							value={salaryType}
						>
							Default
						</SelectItem>
						<SelectItem
							className="text-neutral-600"
							key="Fixed Salary"
							value={salaryType}
						>
							Fixed Salary
						</SelectItem>
						<SelectItem
							className="text-neutral-600"
							key="Ranged Salary"
							value={salaryType}
						>
							Ranged Salary
						</SelectItem>
					</Select>
					<>
						{salaryType === "default" ? (
							<p className="text-small text-red-600 ml-3">
								Please provide salary type*
							</p>
						) : salaryType === "Fixed Salary" ? (
							<Input
								radius="full"
								type="number"
								placeholder="Enter Fixed Salary"
								value={fixedSalary}
								onChange={(e) => setFixedSalary(e.target.value)}
							/>
						) : (
							<>
								<Input
									radius="full"
									type="number"
									placeholder="Salary From"
									value={salaryFrom}
									onChange={(e) => setSalaryFrom(e.target.value)}
								/>
								<Input
									radius="full"
									type="number"
									placeholder="Salary To"
									value={salaryTo}
									onChange={(e) => setSalaryTo(e.target.value)}
								/>
							</>
						)}
					</>
					<Textarea
						label="Description"
						placeholder="Enter your description"
						className=""
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<Button
						radius="full"
						variant="shadow"
						color="warning"
						fullWidth
						onClick={handleJobPost}
					>
						Create Job
					</Button>
				</form>
			</CardBody>
			<CardFooter className="flex gap-3"></CardFooter>
		</Card>
	);
}

export default PostJob;
