import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { useState } from 'react';
import UseAxiosSecure from '../../../../Hooks/UseAxiosSecure';
import ApproveModal from './ApproveModal';

const StudySession = () => {
  const axiosSecure = UseAxiosSecure();
  const { data: studySessions = [], refetch } = useQuery({
    queryKey: ['studySessions'],
    queryFn: async ({ signal }) => {
      const res = await axiosSecure.get('/studySection', { signal });
      return res.data.data;
    },
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

  const handleApproveClick = (session) => {
    setSelectedSession(session);
    setModalOpen(true);
  };

  const handleApproveSession = async (session) => {
    try {
      await axiosSecure.patch(`/studySection/approve/${session._id}`, {
        fee: session.fee,
      });
      Swal.fire({
        title: 'Approved!',
        text: 'The session has been approved successfully.',
        icon: 'success',
      });
      setModalOpen(false);
      setSelectedSession(null);
      refetch();
    } catch (error) {
      Swal.fire('Error', 'Failed to approve the session.', 'error');
    }
  };

  const handleRejectSession = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This session will be marked as rejected.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/studySection/reject/${id}`);
          Swal.fire("Rejected!", "The session has been marked as rejected.", "success");
          refetch(); // Refresh data to update UI
        } catch (error) {
          Swal.fire("Error", "Failed to reject the session.", "error");
        }
      }
    });
  };


  const handleDeleteSession = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This session will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/studySection/delete/${id}`);
          Swal.fire('Deleted!', 'The session has been deleted.', 'success');
          refetch();
        } catch (error) {
          Swal.fire('Error', 'Failed to delete the session.', 'error');
        }
      }
    });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center my-4">All Study Sessions</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Tutor</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {studySessions.map((session, index) => (
              <tr key={session._id}>
                <th>{index + 1}</th>
                <td>{session.title}</td>
                <td>{session.tutorName}</td>
                <td>{session.status}</td>
                <td>
                  {session.status === 'pending' ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApproveClick(session)}
                        className="btn btn-success btn-sm"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejectSession(session._id)}
                        className="btn btn-error btn-sm"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => alert('Update functionality pending')}
                        className="btn btn-warning btn-sm"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDeleteSession(session._id)}
                        className="btn btn-error btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <ApproveModal
          session={selectedSession}
          onClose={() => setModalOpen(false)}
          onApprove={handleApproveSession}
        />
      )}
    </div>
  );
};

export default StudySession;
