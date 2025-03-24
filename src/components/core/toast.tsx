import { toast as Toast, ToastContainer } from "react-toastify";
import type { ToastContainerProps } from "react-toastify";

const Toaster = (props: ToastContainerProps) => {
	return <ToastContainer {...props} />;
};

export { Toaster, Toast };
