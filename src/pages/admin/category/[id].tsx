import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailCategory from "@/components/views/Admin/DetailCategory";

const AdminDetailCategoryPage = () => {
  return (
    <DashboardLayout
      type="admin"
      title="Detail Category"
      desciprtion="Manage information for this category."
    >
      <DetailCategory />
    </DashboardLayout>
  );
};

export default AdminDetailCategoryPage;
