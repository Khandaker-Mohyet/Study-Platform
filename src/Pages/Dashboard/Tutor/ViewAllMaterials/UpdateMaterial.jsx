import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const UpdateMaterial = () => {
  const updateMaterial = useLoaderData(); // Load the current material data
  const axiosSecure = UseAxiosSecure();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: updateMaterial.title,
      studySessionId: updateMaterial.studySessionId,
      tutorEmail: updateMaterial.tutorEmail,
      photo: updateMaterial.photo,
      link: updateMaterial.link,
    },
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.put(`/materials/update/${updateMaterial._id}`, data);

      if (res.data.message) {
        Swal.fire({
          title: "Success!",
          text: "Material updated successfully!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/dashboard/ViewAllMaterials");
        });
      }
    } catch (error) {
      console.error("Failed to update material:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update material.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div>
      <h2>Update Material</h2>
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
            {...register("studySessionId", { required: true })}
            readOnly
            className="input input-bordered bg-gray-100"
          />
        </div>

        {/* Tutor Email */}
        <div className="form-control">
          <label>Tutor Email</label>
          <input
            type="email"
            {...register("tutorEmail", { required: true })}
            readOnly
            className="input input-bordered bg-gray-100"
          />
        </div>

        {/* photo */}
        <div className="form-control">
          <label>Photo Link</label>
          <input
            type="url"
            {...register("photo", { required: true })}
            className="input input-bordered"
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
          Update Material
        </button>
      </form>
    </div>
  );
};

export default UpdateMaterial;
