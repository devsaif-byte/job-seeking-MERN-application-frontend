import { useContext, useState } from "react";
import { DataContext } from "../../contexts/DataContext";
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Input,
	Select,
	SelectItem,
} from "@nextui-org/react";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { MainLogo } from "../common/Logo";
import Btn from "../common/Button";
function Register() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [phone, setPhone] = useState("");
	const [role, setRole] = useState("");
	const { isAuthorized, setIsAuthorized, user, setUser } =
		useContext(DataContext);

	const handleRegister = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post(
				"https://job-bucket-server.onrender.com/api/v1/user/register",
				{ name, email, phone, password, role },
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				}
			);
			console.log(data);
			toast.success(data.message);
			setName("");
			setEmail("");
			setPassword("");
			setPhone("");
			setRole("");
			setIsAuthorized(true);
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};
	if (isAuthorized) return <Navigate to="/" />;
	return (
		<Card
			shadow="sm"
			className="flex xs:w-full md:w-96 lg:w-[500px] m-auto flex-wrap md:flex-nowrap gap-4"
		>
			<CardHeader>
				<MainLogo />
				<h3 className="font-semibold ml-2 text-indigo-500">
					Register Your Account
				</h3>
			</CardHeader>
			<CardBody>
				<form
					className="flex flex-col gap-3"
					action=""
					onSubmit={handleRegister}
				>
					<Select
						radius="full"
						label="Register As"
						placeholder="Select a role"
						selectedKeys={[role]}
						onChange={(e) => setRole(e.target.value)}
					>
						<SelectItem
							className="text-neutral-600"
							key="Job Seeker"
							value="job seeker"
						>
							Job Seeker
						</SelectItem>
						<SelectItem
							className="text-neutral-600"
							key="Employer"
							value="employer"
						>
							Employer
						</SelectItem>
					</Select>
					<p className="text-small text-yellow-600 ml-3">Selected: {role}</p>
					<Input
						type="text"
						label="Name"
						radius="full"
						autoComplete="username"
						onChange={(e) => setName(e.target.value)}
					/>
					<Input
						type="email"
						label="Email"
						autoComplete=""
						radius="full"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						type="password"
						label="Password"
						autoComplete="current-password"
						radius="full"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Input
						type="phone"
						label="Phone"
						autoComplete=""
						radius="full"
						onChange={(e) => setPhone(e.target.value)}
					/>
				</form>
			</CardBody>
			<CardFooter className="flex gap-3">
				<Btn text="Register" onClick={handleRegister} />

				<Link to="/login" className="underline decoration-solid">
					Login Here
				</Link>
			</CardFooter>
		</Card>
	);
}

export default Register;
