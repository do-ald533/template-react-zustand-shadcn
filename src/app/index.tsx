import { RouterProvider } from "react-router";

import { AppProvider } from "./app-provider";
import { router } from "./routes";

export function App() {
	return (
		<AppProvider>
			<RouterProvider router={router} />
		</AppProvider>
	);
}
