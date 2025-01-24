import { Link } from "react-router-dom";

const Card = ({ AllData }) => {
  const {
    _id,
    title,
    description,
    registrationStartDate,
    registrationEndDate,
    status,
  } = AllData;

  const currentDate = new Date();
  const registrationStart = new Date(registrationStartDate);
  const registrationEnd = new Date(registrationEndDate);

  // Check if the registration is ongoing
  const isOngoing =
    currentDate >= registrationStart && currentDate <= registrationEnd;

  // Check if status is approved
  const isApproved = status === "approved";

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      <p className="text-gray-600 my-2">{description}</p>
      <p className="text-gray-600 my-2 font-semibold">
        Start Registration: {registrationStartDate}
      </p>
      <p className="text-gray-600 my-2 font-semibold">
        End Registration: {registrationEndDate}
      </p>
      <p className="text-gray-600 my-2 font-semibold">Status: {status}</p>
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
        <Link
          to={`/details/single/${_id}`}
          className={`px-4 py-2 rounded-md ${
            isApproved
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          style={{ pointerEvents: isApproved ? "auto" : "none" }}
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;
