import { useState } from "react";
import Modal from "react-modal";
import { useLoaderData } from "react-router-dom";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import useRole from "../../Hooks/useRole";
import useAuth from "../../Hooks/useAuth";

Modal.setAppElement("#root");

const Details = () => {
  const AllData = useLoaderData();
  const [userData, userLoading] = useRole();
  const axiosSecure = UseAxiosSecure();
  const { user } = useAuth();

  // State for modal visibility and bank account input
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bankAccount, setBankAccount] = useState("");

  if (userLoading || !userData) {
    return <p>Loading...</p>;
  }

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

  const handleAddCard = () => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Login Required",
        text: "You need to log in to book this session.",
      });
      return;
    }

    if (!bankAccount) {
      Swal.fire({
        icon: "error",
        title: "Input Required",
        text: "Please enter a valid bank account number.",
      });
      return;
    }

    const bookItem = {
      bookId: _id,
      email: user.email,
      title,
      tutorName,
      bankAccount,
    };

    axiosSecure.post("/book", bookItem).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${title} has been booked successfully!`,
          showConfirmButton: false,
          timer: 1500,
        });
        setIsModalOpen(false); // Close modal after successful booking
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      <p className="text-gray-600 mt-2">{description}</p>

      {/* Tutor Details */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Tutor Information
        </h2>
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

      {/* Book Now / Registration Closed */}
      <div className="mt-6 flex justify-between items-center">
        {userData?.role === "admin" || userData?.role === "Tutor" ? (
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded-md cursor-not-allowed"
            disabled
          >
            Book Now (Disabled for Admin/Tutor)
          </button>
        ) : isRegistrationOpen ? (
          <button
            onClick={() => setIsModalOpen(true)} // Open the modal
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
          Status: {status?.charAt(0).toUpperCase() + status?.slice(1) || "Unknown"}
        </p>
      </div>

      {/* Payment Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="bg-white w-6/12 mx-auto p-6 rounded-lg shadow-lg border"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-lg font-bold mb-4">Enter Bank Account Number</h2>
        <input
          type="text"
          value={bankAccount}
          onChange={(e) => setBankAccount(e.target.value)}
          placeholder="Enter your bank account number"
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        <button
          onClick={handleAddCard}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Pay
        </button>
      </Modal>
    </div>
  );
};

export default Details;
