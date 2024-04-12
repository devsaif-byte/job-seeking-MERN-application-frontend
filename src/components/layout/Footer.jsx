import { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";

function Footer() {
	const { isAuthorized } = useContext(DataContext);
	return (
		<div
			className={`flex justify-center items-center h-16 ${
				isAuthorized ? "block" : "hidden"
			} static bottom-0`}
		>
			&copy; Copyright JobBucket - 2024
		</div>
	);
}

export default Footer;
