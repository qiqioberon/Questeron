import { useQuery } from "@tanstack/react-query";
import main from "../main";
import { AllTasks } from "@/types/Tasks";
import { ApiResponse } from "@/types/response";

export default function GetTaskData() {
	const {
		data: taskData,
		isSuccess,
		refetch,
		status,
	} = useQuery({
		queryKey: ["/task"],
		queryFn: () => {
			return main.get<ApiResponse<AllTasks>>("/task");
		},
		enabled: true,
		retry: 1,
	});
	console.log(status);
	return { taskData, isSuccess, refetch };
}
