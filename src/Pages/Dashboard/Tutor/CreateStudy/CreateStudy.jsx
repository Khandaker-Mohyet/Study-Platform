import { useForm } from "react-hook-form";
import { FaSave } from "react-icons/fa";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";

const CreateStudy = () => {
  const { user } = useAuth(); // Current user data
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = UseAxiosSecure();

  // States for date pickers
  const [registrationStartDate, setRegistrationStartDate] = useState(new Date());
  const [registrationEndDate, setRegistrationEndDate] = useState(new Date());
  const [classStartDate, setClassStartDate] = useState(new Date());
  const [classEndDate, setClassEndDate] = useState(new Date());

  const onSubmit = async (data) => {
    // Prepare the session data
    const sessionData = {
      title: data.title,
      tutorName: user?.displayName,
      tutorEmail: user?.email,
      description: data.description,
      registrationStartDate,
      registrationEndDate,
      classStartDate,
      classEndDate,
      duration: data.duration,
      fee: parseFloat(data.fee || 0), // Default 0
      status: "pending", // Default status
    };

    try {
      const response = await axiosSecure.post('/studySection', sessionData);
      if (response.data.insertedId) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Session added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error adding session:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Session</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Session Title */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Session Title</span>
          </label>
          <input
            type="text"
            placeholder="Enter session title"
            {...register("title", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        {/* Tutor Name (read-only) */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Tutor Name</span>
          </label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Tutor Email (read-only) */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Tutor Email</span>
          </label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Session Description */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Session Description</span>
          </label>
          <textarea
            {...register("description", { required: true })}
            placeholder="Enter session description"
            className="textarea textarea-bordered w-full h-24"
          ></textarea>
        </div>

        {/* Registration Start Date */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Registration Start Date</span>
          </label>
          <DatePicker
            selected={registrationStartDate}
            onChange={(date) => setRegistrationStartDate(date)}
            className="input input-bordered w-full"
          />
        </div>

        {/* Registration End Date */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Registration End Date</span>
          </label>
          <DatePicker
            selected={registrationEndDate}
            onChange={(date) => setRegistrationEndDate(date)}
            className="input input-bordered w-full"
          />
        </div>

        {/* Class Start Date */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Class Start Date</span>
          </label>
          <DatePicker
            selected={classStartDate}
            onChange={(date) => setClassStartDate(date)}
            className="input input-bordered w-full"
          />
        </div>

        {/* Class End Date */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Class End Date</span>
          </label>
          <DatePicker
            selected={classEndDate}
            onChange={(date) => setClassEndDate(date)}
            className="input input-bordered w-full"
          />
        </div>

        {/* Session Duration */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Session Duration (in hours)</span>
          </label>
          <input
            type="number"
            placeholder="Enter session duration"
            {...register("duration", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        {/* Registration Fee */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Registration Fee</span>
          </label>
          <input
            type="number"
            defaultValue="0"
            readOnly
            {...register("fee")}
            className="input input-bordered w-full"
          />
        </div>

        {/* Submit Button */}
        <button className="btn btn-primary mt-4">
          Save Session <FaSave className="ml-2" />
        </button>
      </form>
    </div>
  );
};

export default CreateStudy;
