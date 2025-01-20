import { Link, } from "react-router-dom";
import useBooked from "../../Hooks/useBooked";

const Booked = () => {
  const [booked] = useBooked();

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table  w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Session Title</th>
              <th>Tutor Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {booked.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>{item.sessionTitle}</td>
                <td>{item.tutorName}</td>
                <td>{item.tutorName}</td>
                <td>
                  <Link to={`/dashboard/details/${item.bookId}`}>
                    <button

                    className="btn btn-ghost btn-lg"
                  >
                    Details
                  </button>
                  
                  </Link>
                    
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  
  );
};

export default Booked;
