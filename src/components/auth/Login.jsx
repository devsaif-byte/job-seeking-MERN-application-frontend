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
import { useContext, useState } from "react";
import { DataContext } from "../../contexts/DataContext";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { MainLogo } from "../common/Logo";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Btn from "../common/Button";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("");
	const { isAuthorized, setIsAuthorized } = useContext(DataContext);

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post(
				"http://localhost:5000/api/v1/user/login",
				{ email, password, role },
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				}
			);
			console.log(data);
			toast.success(data.message);
			setEmail("");
			setPassword("");
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
			className="flex xs:w-full md:w-96 lg:w-[500px] flex-wrap m-auto md:flex-nowrap gap-4"
		>
			<CardHeader>
				<MainLogo />
				<h3 className="font-semibold ml-2 text-indigo-500">Login</h3>
			</CardHeader>
			<CardBody>
				<form className="flex flex-col gap-3" action="" onSubmit={handleLogin}>
					<Select
						label="Login As"
						radius="full"
						selectedKeys={[role]}
						onChange={(e) => setRole(e.target.value)}
					>
						<SelectItem
							className="text-neutral-600"
							key="Job Seeker"
							value="Job Seeker"
						>
							Job Seeker
						</SelectItem>
						<SelectItem
							className="text-neutral-600"
							key="Employer"
							value="Employer"
						>
							Employer
						</SelectItem>
					</Select>
					<p className="text-small text-yellow-600 ml-3">Selected: {role}</p>
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
				</form>
			</CardBody>
			<CardFooter className="flex gap-3">
				<span>
					<Btn text="Login" onClick={handleLogin} />
				</span>

				<Link to="/register" className="underline decoration-solid">
					Register Here
				</Link>
			</CardFooter>
		</Card>
	);
}

export default Login;
