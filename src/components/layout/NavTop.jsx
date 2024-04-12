import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenuToggle,
	NavbarMenu,
	NavbarMenuItem,
	// Link,
	Button,
} from "@nextui-org/react";
import { MainLogo } from "../common/Logo.jsx";
import { useState } from "react";
import { useContext } from "react";
import { DataContext } from "../../contexts/DataContext.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function NavTop() {
	const { isAuthorized, setIsAuthorized, user } = useContext(DataContext);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [active, setActive] = useState(false);
	const navigate = useNavigate();
	const menuItems = ["Home", "All Jobs", "My Applications", "Log Out"];
	const urlRefs = ["/", "/job/all", "/applications-me"];

	const handleLogout = async () => {
		try {
			const response = await axios.get(
				"http://localhost:5000/api/v1/user/logout",
				{ withCredentials: true }
			);
			const data = await response.data;
			toast.success(data.message);
			setIsAuthorized(false);
			navigate("/login");
		} catch (error) {
			toast.error(error.response.data.message);
			setIsAuthorized(true);
		}
	};

	// if (!isAuthorized) return <Navigate to="/login" />;
	return (
		<Navbar
			shouldHideOnScroll
			maxWidth="xl"
			className={`${isAuthorized ? `` : `hidden`}`}
		>
			<NavbarContent>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					className="sm:hidden"
				/>
				<NavbarBrand>
					<MainLogo />
					<p className="font-bold text-inherit text-green-500">JobBucket</p>
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				<NavbarItem>
					<Link color="foreground" to="/">
						Home
					</Link>
				</NavbarItem>
				<NavbarItem isActive>
					<Link to="/job/all">All Jobs</Link>
				</NavbarItem>
				<NavbarItem>
					<Link color="foreground" to="/applications-me">
						{user && user.role === "Employer"
							? "Applicant Applications"
							: "My Applications"}
					</Link>
				</NavbarItem>
				{user && user.role === "Employer" ? (
					<>
						<NavbarItem>
							<Link to="/job/post">Post New Job</Link>
						</NavbarItem>
						<NavbarItem>
							<Link to="/job/me">View Your Jobs</Link>
						</NavbarItem>
					</>
				) : (
					<></>
				)}
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarItem>
					<Button
						as={Link}
						radius="full"
						color="success"
						to="#"
						variant="shadow"
						className="text-white"
						onClick={handleLogout}
					>
						Logout
					</Button>
				</NavbarItem>
			</NavbarContent>
			<NavbarMenu>
				{menuItems.map((item, index) => (
					<NavbarMenuItem key={`${item}-${index}`}>
						<Link
							color={
								index === 2
									? "primary"
									: index === menuItems.length - 1
									? "danger"
									: "foreground"
							}
							className="w-full"
							to="#"
							size="lg"
						>
							{item}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</Navbar>
	);
}

export default NavTop;
