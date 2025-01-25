import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Member/Dashboard";

const DashboardMemberPage = () => {
    return (
        <DashboardLayout type="member" title="Dashboard" desciprtion="Dashboard Member">
            <Dashboard />
        </DashboardLayout>
    );
};

export default DashboardMemberPage;