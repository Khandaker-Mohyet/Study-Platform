import { Link } from "react-router-dom";


const Card = ({AllData}) => {


  const {
          _id,
          sessionTitle,
          sessionDescription,
          registrationStartDate,
          registrationEndDate,
          
        } = AllData;

  const currentDate = new Date(); 

  

        const registrationStart = new Date(registrationStartDate);
        const registrationEnd = new Date(registrationEndDate);
        const isOngoing =
          currentDate >= registrationStart && currentDate <= registrationEnd;

  return (
    <div
            className="border rounded-lg p-4 shadow-md bg-white"
          >
            <h3 className="text-lg font-bold text-gray-800">{sessionTitle}</h3>
            <p className="text-gray-600 my-2">{sessionDescription}</p>
            <p className="text-gray-600 my-2">Start Registration: {registrationStartDate}</p>
            <p className="text-gray-600 my-2">End Registration: {registrationEndDate}</p>
            <div className="flex items-center justify-between">
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  isOngoing
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white cursor-not-allowed"
                }`}
                disabled={!isOngoing}
              >
                {isOngoing ? "Ongoing" : "Closed"}
              </button>
              <Link to={`/details/${_id}`} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Read More
              </Link>
            </div>
          </div>
  );
};

export default Card;