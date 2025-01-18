import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import axios from "axios";

const useRole = () => {
  const { user } = useAuth(); // ইউজারের ডেটা আনুন

  // React Query ব্যবহার করে পুরো ডেটা লোড করা
  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ["userData", user?.email], // কাস্টম কুইরি কি
    queryFn: async () => {
      if (!user?.email) return null; // ইউজার ইমেইল না থাকলে null ফেরত দিন
      const res = await axios.get(`http://localhost:5000/users/${user.email}`); // API কল
      return res.data; // পুরো ডেটা রিটার্ন করুন
    },
    enabled: !!user?.email, // কুইরি চালু হওয়ার শর্ত
  });

  return [userData, userLoading]; // ডেটা এবং লোডিং স্টেট রিটার্ন করুন
};

export default useRole;
