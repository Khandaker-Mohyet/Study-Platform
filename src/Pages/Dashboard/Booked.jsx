import useBooked from "../../Hooks/useBooked";




const Booked = () => {
  const [booked] = useBooked()
  console.log(booked)
  return (
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
              <th>Tutor Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              booked.map((item, index) => <tr key={item._id}>
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
                    Details
                  </button>
                </th>
              </tr>)
            }


          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Booked;