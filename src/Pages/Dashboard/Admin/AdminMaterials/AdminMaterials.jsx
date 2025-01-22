import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const AdminMaterials = () => {
  const axiosSecure = UseAxiosSecure();

  // Fetch materials data using react-query
  const { data: materials = [], refetch } = useQuery({
    queryKey: ["materials"],
    queryFn: async ({ signal }) => {
      const res = await axiosSecure.get("/materials", { signal });
      return res.data;
    },
  });

  // Handle delete functionality
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/materials/delete/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "The material has been deleted.", "success");
          refetch(); // Refetch materials after deletion
        }
      } catch (error) {
        console.error("Failed to delete material:", error);
        Swal.fire("Error!", "Failed to delete the material.", "error");
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Admin Materials</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* Table Head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Session ID</th>
              <th>Tutor Email</th>
              <th>Google Drive Link</th>
              <th>Actions</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {materials.map((material, index) => (
              <tr key={material._id}>
                <td>{index + 1}</td>
                <td>{material.title}</td>
                <td>{material.studySessionId}</td>
                <td>{material.tutorEmail}</td>
                <td>
                  <a
                    href={material.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View
                  </a>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(material._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMaterials;
