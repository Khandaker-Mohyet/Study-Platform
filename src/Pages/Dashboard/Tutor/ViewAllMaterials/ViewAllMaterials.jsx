import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import { Link } from "react-router-dom";

const ViewAllMaterials = () => {
  const { user } = useAuth();
  const axiosSecure = UseAxiosSecure();
  const [materials, setMaterials] = useState([]);

  // Fetch materials uploaded by the tutor
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await axiosSecure.get(`/materials?tutorEmail=${user.email}`);
        setMaterials(res.data);
      } catch (error) {
        console.error("Failed to fetch materials:", error);
      }
    };

    fetchMaterials();
  }, [user.email, axiosSecure]);

  // Handle delete material
  const handleDelete = (id) => {
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
          const res = await axiosSecure.delete(`/materials/delete/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "The material has been deleted.", "success");
            setMaterials((prev) => prev.filter((item) => item._id !== id));
          }
        } catch (error) {
          console.error("Failed to delete material:", error);
          Swal.fire("Error!", "Failed to delete the material.", "error");
        }
      }
    });
  };


  // Render materials
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Uploaded Materials</h2>
      {materials.length === 0 ? (
        <p>No materials found.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Study Session ID</th>
              <th className="border border-gray-300 p-2">Link</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((material) => (
              <tr key={material._id}>
                <td className="border border-gray-300 p-2">{material.title}</td>
                <td className="border border-gray-300 p-2">{material.studySessionId}</td>
                <td className="border border-gray-300 p-2">
                  <a href={material.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    View
                  </a>
                </td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => handleDelete(material._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Delete
                  </button>
                  <Link to={`/dashboard/updateMaterials/${material._id}`}>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Update
                  </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewAllMaterials;
