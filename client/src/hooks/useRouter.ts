import { useNavigate } from "react-router";

export function useRouter() {
    const redirect = useNavigate()
    return { redirect }
}