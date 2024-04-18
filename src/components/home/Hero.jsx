import { Button, Link } from "@nextui-org/react";
import Btn from "../common/Button";
import { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";
import { useNavigate } from "react-router-dom";

const Hero = () => {
	const { isAuthorized, user } = useContext(DataContext);
	const navigate = useNavigate();
	// if (!isAuthorized) navigate("/login");
	return (
		<section className="min-h-full w-full">
			<div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:justify-center lg:items-center">
				<div className="mx-auto max-w-xxl text-center">
					<h1 className="font-extrabold sm:text-5xl tracking-widest mb-5">
						<strong className="font-extrabold text-indigo-500 sm:block">
							The Easiest Way
						</strong>
						to Get Your New Job.
					</h1>

					<p className="mt-4 sm:text-xl/relaxed max-w-[80%] mx-auto">
						Each month, more than 3 million job seekers turn to website in their
						search for work, making over 140,000 applications every single day.
					</p>

					{!isAuthorized && (
						<div className="mt-8 flex flex-wrap justify-center gap-4">
							<Btn to={!isAuthorized ?? "/login"} text="Get Started" />
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default Hero;
