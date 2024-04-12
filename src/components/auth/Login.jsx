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
import { Navigate } from "react-router-dom";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("");
	const { isAuthorized, setIsAuthorized, user, setUser } =
		useContext(DataContext);
	console.log(typeof email, typeof password, typeof role);
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
				<h3>Login</h3>
			</CardHeader>
			<CardBody>
				<form className="flex flex-col gap-3" action="" onSubmit={handleLogin}>
					<Select
						label="Login As"
						radius="full"
						selectedKeys={[role]}
						onChange={(e) => setRole(e.target.value)}
					>
						<SelectItem key="Job Seeker" value="Job Seeker">
							Job Seeker
						</SelectItem>
						<SelectItem key="Employer" value="Employer">
							Employer
						</SelectItem>
					</Select>

					<Input
						type="email"
						label="Email"
						radius="full"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						type="password"
						label="Password"
						radius="full"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</form>
			</CardBody>
			<CardFooter className="flex gap-3">
				<span>
					<Button
						radius="full"
						variant="shadow"
						color="danger"
						onClick={handleLogin}
					>
						Login
					</Button>
				</span>

				<Link to="/register" className="underline decoration-solid">
					Register Here
				</Link>
			</CardFooter>
		</Card>
	);
}

export default Login;