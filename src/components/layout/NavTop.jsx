import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenuToggle,
	NavbarMenu,
	NavbarMenuItem,
} from "@nextui-org/react";
import { MainLogo } from "../common/Logo.jsx";
import { useState } from "react";
import { useContext } from "react";
import { DataContext } from "../../contexts/DataContext.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Btn from "../common/Button.jsx";
import { useEffect } from "react";

function NavTop() {
	const { isAuthorized, setIsAuthorized, user } = useContext(DataContext);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [active, setActive] = useState(false);
	const menuItems = ["Home", "All Jobs", "My Applications", "Log Out"];
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			const response = await axios.get(
				"https://job-bucket-server.onrender.com/api/v1/user/logout",
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

	useEffect(() => {
		if (!isAuthorized) return navigate("/login");
	}, [isAuthorized]);

	return (
		<Navbar
			shouldHideOnScroll
			maxWidth="xl"
			className={`${isAuthorized ? `` : `hidden`}`}
			isBordered="true"
		>
			<NavbarContent>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					className="sm:hidden"
				/>
				<NavbarBrand>
					<MainLogo />
					<p className="font-bold ml-2 text-2xl text-indigo-500">JobBucket</p>
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent
				className="hidden sm:flex gap-4 font-semibold"
				justify="center"
			>
				<NavbarItem>
					<Link color="foreground" to="/">
						Home
					</Link>
				</NavbarItem>
				<NavbarItem>
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
					<Btn to="" onClick={handleLogout} text="Logout" />
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
