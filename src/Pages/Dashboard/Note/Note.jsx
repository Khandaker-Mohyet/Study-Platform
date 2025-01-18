import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import useAuth from "../../../Hooks/useAuth";


const Note = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = UseAxiosSecure();
  const { user } = useAuth();

  const onSubmit = async (data) => {
    const noteData = {
      email: user.email,
      title: data.title,
      description: data.description,
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/notes", noteData);
      if (res.data.insertedId) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Note created successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to create note.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
      <h2>Create Note</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div className="form-control">
          <label>Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="input input-bordered bg-gray-100"
          />
        </div>

        {/* Title */}
        <div className="form-control">
          <label>Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="input input-bordered"
          />
        </div>

        {/* Description */}
        <div className="form-control">
          <label>Description</label>
          <textarea
            {...register("description", { required: true })}
            className="textarea textarea-bordered"
            rows="4"
            placeholder="Write your note here..."
          ></textarea>
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary">
          Create Note
        </button>
      </form>
    </div>
  );
};

export default Note;
