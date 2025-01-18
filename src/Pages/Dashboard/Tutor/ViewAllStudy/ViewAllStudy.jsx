import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";

const ViewAllStudy = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = useAuth();

  const { data: allStudy = [], isLoading } = useQuery({
    queryKey: ['allStudy', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/studySection/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email, 
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  console.log(allStudy)
  console.log(user.email)

  return (
    <div>
      <h1>All Studies for Tutor</h1>
      <div>
      <div className="overflow-x-auto">
        <table className="table  w-full">
          {/* head */}
          <thead>
            <tr>
              <th>
                #
              </th>
              
              <th>Session Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              allStudy.map((item, index) => <tr key={item._id}>
                <th>
                  {index + 1}
                </th>
                
                <td>
                  {item.title}
                </td>
                <td>{item.tutorName}</td>
                <th>
                  <button
                    
                    className="btn btn-ghost btn-lg">
                    {item.status}
                  </button>
                </th>
              </tr>)
            }


          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default ViewAllStudy;
