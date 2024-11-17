import { authKey } from "@/constants/authkey";
import { deleteCookies } from "./deleteCookies";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "sonner";

export const logoutUser = (router: AppRouterInstance) => {
    localStorage.removeItem(authKey);
    deleteCookies([authKey, "token"]);
    toast.success("User logged out", { duration: 3000 });
    router.push("/login");
    router.refresh();
};
