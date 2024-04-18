import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

function Btn({ to, text, onClick }) {
	if (text === "Apply this Job")
		return (
			<Button
				className="text-white"
				radius="full"
				variant="shadow"
				size="sm"
				as={Link}
				to={to}
				onClick={onClick}
				color="success"
			>
				{text}
			</Button>
		);
	return (
		<Button
			className="text-white shadow-lg bg-indigo-500"
			radius="full"
			as={Link}
			to={to}
			onClick={onClick}
		>
			{text}
		</Button>
	);
}

export default Btn;
