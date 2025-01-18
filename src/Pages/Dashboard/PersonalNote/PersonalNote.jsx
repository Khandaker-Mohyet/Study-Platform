import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useState } from "react";
import { useForm } from "react-hook-form";

const PersonalNote = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteToUpdate, setNoteToUpdate] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const { data: personalNotes = [], refetch } = useQuery({
    queryKey: ["personalNotes", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/notes?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/notes/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Your note has been deleted.", "success");
            refetch();
          }
        } catch (error) {
          console.error(error);
          Swal.fire("Error!", "Failed to delete note.", "error");
        }
      }
    });
  };

  const handleUpdateModal = (note) => {
    setNoteToUpdate(note);
    setIsModalOpen(true);
    reset({ title: note.title, description: note.description });
  };

  const handleUpdateSubmit = (data) => {
    if (noteToUpdate) {
      axiosSecure
        .put(`/notes/${noteToUpdate._id}`, data)
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire("Updated!", "Your note has been updated.", "success");
            refetch();
            setIsModalOpen(false);
          }
        })
        .catch((error) => {
          console.error(error);
          Swal.fire("Error!", "Failed to update note.", "error");
        });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Manage Personal Notes</h1>
      <p className="text-lg mb-4">Total Notes: {personalNotes.length}</p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {personalNotes.map((note) => (
          <div
            key={note._id}
            className="card bg-base-100 shadow-md border border-gray-200 rounded-lg"
          >
            <div className="card-body">
              <h3 className="card-title font-bold">{note.title}</h3>
              <p>{note.description}</p>
              <div className="card-actions justify-end mt-4">
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleUpdateModal(note)}
                >
                  Update
                </button>
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => handleDelete(note._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Update Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75 z-50 w-full">
          <div className="modal modal-open w-6/12 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-white">Update Note</h2>
            <form onSubmit={handleSubmit(handleUpdateSubmit)} className="w-full">
              {/* Title */}
              <div className="form-control mb-4 w-full">
                <label className="label text-white">Title</label>
                <input
                  type="text"
                  {...register("title", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Description */}
              <div className="form-control mb-4">
                <label className="label text-white">Description</label>
                <textarea
                  {...register("description", { required: true })}
                  className="textarea textarea-bordered w-full"
                  rows="4"
                  placeholder="Write your note here..."
                ></textarea>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update Note
                </button>
              </div>
            </form>
          </div>
        </div>

      )}
    </div>
  );
};

export default PersonalNote;
