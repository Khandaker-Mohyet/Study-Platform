import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import axios from "axios";

const useRole = () => {
  const { user } = useAuth();

  
  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ["userData", user?.email], 
    queryFn: async () => {
      if (!user?.email) return null; 
      const res = await axios.get(`https://assignment-12-server-henna-nu.vercel.app/users/${user.email}`); 
      return res.data; 
    },
    enabled: !!user?.email, 
  });

  return [userData, userLoading];
};

export default useRole;
