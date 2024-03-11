import { QueryProvider } from "@/components/providers/query-provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<QueryProvider>
			<div className="h-full flex items-center justify-center">{children}</div>
			<ToastContainer position="top-center" />
		</QueryProvider>
	);
};

export default AuthLayout;
