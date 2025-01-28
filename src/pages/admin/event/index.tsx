import DashboardLayout from "@/components/layouts/DashboardLayout";
import Event from "@/components/views/Admin/Event";

const AdminEventPage = () => {
  return (
    <DashboardLayout
      type="admin"
      title="Event"
      desciprtion="List of all Events, Create New Event, and Manage Existing Events"
    >
      <Event />
    </DashboardLayout>
  );
};

export default AdminEventPage;
