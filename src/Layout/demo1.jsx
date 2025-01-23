import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import { useLocation } from "react-router-dom";
import axios from "axios";

// const Image_Hosting_Key = import.meta.env.VTE_IMAGE_HOSTING_KEY;
// const Image_Hosting_Api = `https://api.imgbb.com/1/upload?key=${Image_Hosting_Key}`

const UploadMaterials = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = UseAxiosSecure();
  const { user } = useAuth();
  const location = useLocation();
  const studySessionId = location.state?.sessionId;

  const onSubmit = async (data) => {
  try {
    // Image Upload
    // const imageFile = new FormData();
    // imageFile.append("image", data.image[0]);

    // const imageRes = await axios.post(Image_Hosting_Api, imageFile, {
    //   headers: { "Content-Type": "multipart/form-data" },
    // });

    const payload = {
      title: data.title,
      studySessionId: studySessionId,
      tutorEmail: user.email,
      link: data.link,
      // image: imageRes.data.data.display_url,
    };

    // Upload Material
    const res = await axiosSecure.post("/materials", payload);
    if (res.data.insertedId) {
      reset();
      Swal.fire("Success", "Materials uploaded successfully!", "success");
    }
  } catch (error) {
    console.error("Error:", error);
    Swal.fire("Error", "Failed to upload materials.", "error");
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
        {/* image */}
        {/* <div className="form-control ">
          <label>Upload Image</label>
            <input {...register('image', { required: true })} type="file" className="file-input input input-bordered" />
          </div> */}

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
