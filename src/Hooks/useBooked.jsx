import {  useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "./UseAxiosSecure";
import useAuth from "./useAuth";



const useBooked = () => {
  const axiosSecure = UseAxiosSecure();
  const {user}= useAuth()
  const {refetch, data: booked = [] } = useQuery({
    queryKey: ['booked', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/book?email=${user.email}`)
      return res.data
    }
  })
  return [booked, refetch]
  
};

export default useBooked;