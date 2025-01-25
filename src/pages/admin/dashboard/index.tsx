import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Admin/Dashboard";

const DashboardAdminPage = () => {
    return (
        <DashboardLayout type="admin" title="Dashboard" desciprtion="Dashboard Admin">
            <Dashboard />
        </DashboardLayout>
    );
};

export default DashboardAdminPage;