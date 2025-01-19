import { useLoaderData } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const Details = () => {
  const AllData = useLoaderData();
  const { user } = useAuth();
  const axiosSecure = UseAxiosSecure();

  console.log(AllData)
  console.log(user)

 
  const {
    title,
    tutorName,
    tutorEmail,
    description,
    registrationStartDate,
    registrationEndDate,
    classStartDate,
    classEndDate,
    duration,
    fee,
    status,
    _id,
  } = AllData;

 
  const currentDate = new Date();
  const registrationStart = new Date(registrationStartDate);
  const registrationEnd = new Date(registrationEndDate);
  const isRegistrationOpen =
    currentDate >= registrationStart && currentDate <= registrationEnd;

 
  const handelAddCard = (sessionData) => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Login Required",
        text: "You need to log in to book this session.",
      });
      return;
    }

    const bookItem = {
      bookId: _id,
      email: user.email,
      title,
      tutorName,
    };

    axiosSecure.post("/book", bookItem).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${title} added to your cart`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      <p className="text-gray-600 mt-2">{description}</p>

      {/* Tutor Details */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-700">Tutor Information</h2>
        <p className="text-gray-600">Name: {tutorName}</p>
        <p className="text-gray-600">Email: {tutorEmail}</p>
      </div>

      {/* Session Details */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-700">Session Details</h2>
        <p className="text-gray-600">Duration: {duration} hours</p>
        <p className="text-gray-600">
          Registration Fee: {fee === 0 ? "Free" : `$${fee}`}
        </p>
        <p className="text-gray-600">
          Registration Period: {registrationStartDate} to {registrationEndDate}
        </p>
        <p className="text-gray-600">
          Class Schedule: {classStartDate} to {classEndDate}
        </p>
      </div>

      {/* Reviews Section */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-700">Reviews</h2>
        <p className="text-gray-600 italic">
          
          No reviews yet. Be the first to leave a review!
        </p>
      </div>

      {/* Book Now / Registration Closed */}
      <div className="mt-6 flex justify-between items-center">
        {user?.role === "admin" || user?.role === "tutor" ? (
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded-md cursor-not-allowed"
            disabled
          >
            Book Now (Disabled for Admin/Tutor)
          </button>
        ) : isRegistrationOpen ? (
          <button
            onClick={() => handelAddCard(AllData)}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
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
          className={`text-sm font-medium ${(status || "unknown") === "ongoing"
              ? "text-green-600"
              : (status || "unknown") === "upcoming"
                ? "text-blue-600"
                : "text-red-600"
            }`}
        >
          Status: {(status || "unknown").charAt(0).toUpperCase() + (status || "unknown").slice(1)}
        </p>
      </div>
    </div>
  );
};

export default Details;
