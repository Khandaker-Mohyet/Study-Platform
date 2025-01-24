import { Link } from "react-router-dom";
import { FaRegCalendarAlt, FaInfoCircle } from "react-icons/fa";
import { GrStatusUnknown } from "react-icons/gr";

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
    <div className="border rounded-lg p-6 shadow-md bg-white flex flex-col justify-between h-full">
      {/* Title */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
      </div>

      {/* Description */}
      <div className="mt-4">
        <p className="text-gray-600">{description}</p>
      </div>

      {/* Details */}
      <div className="mt-4">
        <p className="text-gray-600 flex items-center gap-2">
          <FaRegCalendarAlt className="text-gray-500" />
          <span>Start Registration: {registrationStartDate}</span>
        </p>
        <p className="text-gray-600 flex items-center gap-2">
          <FaRegCalendarAlt className="text-gray-500" />
          <span>End Registration: {registrationEndDate}</span>
        </p>
        <p className="text-gray-600 flex items-center gap-2">
          <GrStatusUnknown className="text-gray-500" />
          <span>Status: {status}</span>
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 my-4"></div>

      {/* Footer Buttons */}
      <div className="flex justify-between items-center">
        <button
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            isOngoing
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-red-500 text-white cursor-not-allowed"
          }`}
          disabled={!isOngoing}
        >
          {isOngoing ? "Ongoing" : "Closed"}
        </button>
        <Link
          to={`/details/single/${_id}`}
          className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
            isApproved ? "bg-[#008080] hover:bg-teal-600" : "bg-gray-300"
          }`}
          style={{ pointerEvents: isApproved ? "auto" : "none" }}
        >
          <FaInfoCircle className="inline mr-2" />
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;
