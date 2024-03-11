
import { useQuery } from "@tanstack/react-query";
import main from "../main";
import { getUser as getUserType } from "@/types/getUser";
import { ResponseUser } from "@/types/getUserResponse";


export default function getUser() {
    const {
        data: getUserData,
        isLoading,
        error, status
    } = useQuery({
        queryKey: ["/user"],
        queryFn: () => {
            return main.get<ResponseUser<getUserType>>("/user");
        },
        enabled: true,
    });
    console.log(status);
    return { getUserData, isLoading, error };
}
