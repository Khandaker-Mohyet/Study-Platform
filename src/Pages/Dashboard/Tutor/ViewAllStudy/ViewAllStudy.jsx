import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Link } from "react-router-dom";

const ViewAllStudy = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: allStudy = [], isLoading } = useQuery({
    queryKey: ["allStudy", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/studySection/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const requestApproveMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/studySection/requestApprove/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allStudy", user?.email]);
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const renderSessions = (sessions, showUploadButton = false) => {
    if (!sessions.length) {
      return <p>No sessions found.</p>;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions.map((session) => (
          <div
            key={session._id}
            className="card w-full bg-white shadow-md rounded-lg p-4 relative"
          >
            <h3 className="text-xl font-bold text-gray-800">{session.title}</h3>
            <p className="text-gray-600">
              <strong>Tutor:</strong> {session.tutorName}
            </p>
            <p className="text-gray-600">
              <strong>Description:</strong> {session.description}
            </p>
            <p className="text-gray-600">
              <strong>Duration:</strong> {session.duration} months
            </p>
            <p className="text-gray-600">
              <strong>Fee:</strong> {session.fee === 0 ? "Free" : `$${session.fee}`}
            </p>
            <p className="text-gray-600">
              <strong>Status:</strong>{" "}
              <span
                className={`px-2 py-1 rounded ${
                  session.status === "approved"
                    ? "bg-green-200 text-green-800"
                    : session.status === "pending"
                    ? "bg-yellow-200 text-yellow-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {session.status}
              </span>
            </p>
            {showUploadButton && (
              <div className="absolute bottom-4 right-4">
                <Link
                  to="/dashboard/uploadMaterials"
                  state={{ sessionId: session._id }}
                  className="btn btn-primary btn-sm"
                >
                  Upload Material
                </Link>
              </div>
            )}
            {session.status === "rejected" && (
              <button
                onClick={() => requestApproveMutation.mutate(session._id)}
                className="btn btn-secondary btn-sm mt-2"
              >
                Approve Request
              </button>
            )}
          </div>
        ))}
      </div>
    );
  };

  const approvedSessions = allStudy.filter((item) => item.status === "approved");
  const pendingSessions = allStudy.filter((item) => item.status === "pending");
  const rejectedSessions = allStudy.filter((item) => item.status === "rejected");

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-6">All Study Sessions</h1>
      <Tabs>
        <TabList>
          <Tab>Approved</Tab>
          <Tab>Pending</Tab>
          <Tab>Rejected</Tab>
        </TabList>

        <TabPanel>
          {renderSessions(approvedSessions, true)} {/* Show Upload Material button */}
        </TabPanel>

        <TabPanel>
          {renderSessions(pendingSessions)} {/* No Upload Material button */}
        </TabPanel>

        <TabPanel>
          {renderSessions(rejectedSessions)} {/* Show Approve Request button */}
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ViewAllStudy;
