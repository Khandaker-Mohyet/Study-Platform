import { useLoaderData } from "react-router-dom";


const Details = () => {
  const AllData = useLoaderData()
  const {
    sessionTitle,
    tutorName,
    tutorEmail,
    sessionDescription,
    registrationStartDate,
    registrationEndDate,
    classStartDate,
    classEndDate,
    sessionDuration,
    registrationFee,
    status,

  } = AllData;

    const currentDate = new Date();
  const registrationStart = new Date(registrationStartDate);
  const registrationEnd = new Date(registrationEndDate);
  const isRegistrationOpen =
    currentDate >= registrationStart && currentDate <= registrationEnd;
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800">{sessionTitle}</h1>
      <p className="text-gray-600 mt-2">{sessionDescription}</p>

      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-700">Tutor Information</h2>
        <p className="text-gray-600">Name: {tutorName}</p>
        <p className="text-gray-600">Email: {tutorEmail}</p>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-700">Session Details</h2>
        <p className="text-gray-600">Duration: {sessionDuration}</p>
        <p className="text-gray-600">
          Registration Fee:{" "}
          {registrationFee === 0 ? "Free" : `$${registrationFee}`}
        </p>
        <p className="text-gray-600">
          Registration Period: {registrationStartDate} to {registrationEndDate}
        </p>
        <p className="text-gray-600">
          Class Schedule: {classStartDate} to {classEndDate}
        </p>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-700">Reviews</h2>
        <p className="text-gray-600 italic">
          {/* Add a section here for displaying reviews if available */}
          No reviews yet. Be the first to leave a review!
        </p>
      </div>

      <div className="mt-6 flex justify-between items-center">
        {isRegistrationOpen ? (
          <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
            Book Now
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md cursor-not-allowed"
            disabled
          >
            Registration Closed
          </button>
        )}
        <p
          className={`text-sm font-medium ${
            status === "ongoing"
              ? "text-green-600"
              : status === "upcoming"
              ? "text-blue-600"
              : "text-red-600"
          }`}
        >
          Status: {status.charAt(0).toUpperCase() + status.slice(1)}
        </p>
      </div>
    </div>
  );
};

export default Details;