import { useQuery } from "@tanstack/react-query";
import axios from "axios"; 
import useAuth from "./useAuth";

const useBooked = () => {
  const { user } = useAuth();

  const { refetch, data: booked = [] } = useQuery({
    queryKey: ['booked', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axios.get(`http://localhost:5000/book/${user.email}`);
      return res.data;
    }
  });

  return [booked, refetch];
};

export default useBooked;
