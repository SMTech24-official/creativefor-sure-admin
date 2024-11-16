import { logoutUser } from "@/service/actions/logoutUser"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

// Define a custom hook if needed
export const useHandleLogout = () => {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logoutUser(router)  // Make sure logoutUser returns a Promise
      toast.success("Logged out successfully")
    } catch (error) {
      toast.error("Logout failed")
    }
  }

  return handleLogout
}


