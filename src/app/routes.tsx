import { createBrowserRouter, Outlet } from "react-router";
import { Home } from "./pages/Home";
import { ErrorFallback } from "@/components/errors/error-fallback";
import { NotFoundPage } from "./pages/NotFound";
import { MainLayout } from "@/components/common/MainLayout";

export const router = createBrowserRouter([
	{
		path: "/",
		errorElement: <ErrorFallback />,
		element: <Outlet />,
		children: [
			{
				path: "",
				element: <MainLayout />,
				children: [
					{
						index: true,
						element: <Home />,
					},
				],
			},
		],
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
]);
