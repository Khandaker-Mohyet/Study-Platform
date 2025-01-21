import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import { useLocation } from "react-router-dom";

const UploadMaterials = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = UseAxiosSecure();
  const { user } = useAuth();
  const location = useLocation();
  const studySessionId = location.state?.sessionId;

  const onSubmit = async (data) => {
    const payload = {
      title: data.title,
      studySessionId: studySessionId,
      tutorEmail: user.email,
      link: data.link,
    };

    try {
      const res = await axiosSecure.post("/materials", payload);
      if (res.data.insertedId) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Materials uploaded successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to upload materials.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
      <h2>Upload Materials</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div className="form-control">
          <label>Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="input input-bordered"
          />
        </div>

        {/* Study Session ID */}
        <div className="form-control">
          <label>Study Session ID</label>
          <input
            type="text"
            value={studySessionId}
            readOnly
            className="input input-bordered bg-gray-100"
          />
        </div>

        {/* Tutor Email */}
        <div className="form-control">
          <label>Tutor Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="input input-bordered bg-gray-100"
          />
        </div>

        {/* Link */}
        <div className="form-control">
          <label>Google Drive Link</label>
          <input
            type="url"
            {...register("link", { required: true })}
            className="input input-bordered"
          />
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary mt-4">
          Upload Materials
        </button>
      </form>
    </div>
  );
};

export default UploadMaterials;
