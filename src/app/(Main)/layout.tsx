import { QueryProvider } from "@/components/providers/query-provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = ({ children }: { children: React.ReactNode }) => {
	return (
		<QueryProvider>
			<div className="h-full">{children}</div>
			<ToastContainer position="top-center" />
		</QueryProvider>
	);
};

export default Home;
