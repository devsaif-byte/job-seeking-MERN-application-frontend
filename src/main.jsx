import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import "./index.css";
import DataProvider from "./contexts/DataContext.jsx";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<DataProvider>
			<NextUIProvider
				className={`light text-foreground bg-background flex flex-col h-[100dvh]`}
			>
				<App />
			</NextUIProvider>
		</DataProvider>
	</React.StrictMode>
);
