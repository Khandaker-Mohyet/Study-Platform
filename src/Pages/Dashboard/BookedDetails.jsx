import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const BookedDetails = () => {
  const details = useLoaderData();
  const { user } = useAuth();
  const axiosSecure = UseAxiosSecure();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const handleReviewSubmit = async (e) => {
  e.preventDefault();

  const reviewData = {
    sessionId: details._id,
    tutorEmail: details.tutorEmail,
    rating: parseInt(rating),
    review: reviewText,
    userEmail: user.email,
    createdAt: new Date().toISOString().split("T")[0],
  };

  try {
    const response = await axiosSecure.post("/review", reviewData);
    if (response.data.insertedId) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Review submitted successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      setRating(0);
      setReviewText("");
    }
  } catch (err) {
    console.error("Error submitting review:", err);
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Failed to submit review.",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};


  return (
    <div className="p-5 max-w-4xl mx-auto">
      {/* Details Card */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{details.title}</h2>
        <p className="text-gray-700 mb-2">
          <strong className="font-semibold">Tutor Name:</strong> {details.tutorName}
        </p>
        <p className="text-gray-700 mb-2">
          <strong className="font-semibold">Description:</strong> {details.description}
        </p>
        <p className="text-gray-700 mb-2">
          <strong className="font-semibold">Class Duration:</strong> {details.duration} hours
        </p>
        <p className="text-gray-700 mb-2">
          <strong className="font-semibold">Fee:</strong> {details.fee === 0 ? "Free" : `$${details.fee}`}
        </p>
        <p className="text-gray-700 mb-2">
          <strong className="font-semibold">Status:</strong> {details.status}
        </p>
        <p className="text-gray-700 mb-2">
          <strong className="font-semibold">Registration Dates:</strong> {details.registrationStartDate} to {details.registrationEndDate}
        </p>
        <p className="text-gray-700 mb-2">
          <strong className="font-semibold">Class Dates:</strong> {details.classStartDate} to {details.classEndDate}
        </p>
      </div>

      {/* Review Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Write a Review</h3>
        <form className="bg-white shadow-lg rounded-lg p-6" onSubmit={handleReviewSubmit}>
          {/* Rating Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Rating (1 to 5)</label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          {/* Review Text Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Review</label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Write your review here..."
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium px-5 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookedDetails;
