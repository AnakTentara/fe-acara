import DashboardLayout from "@/components/layouts/DashboardLayout";
import Category from "@/components/views/Admin/Category";

const AdminCategoryPage = () => {
  return (
    <DashboardLayout
      type="admin"
      title="Category"
      desciprtion="List of all Categoies, Create New Category, and Manage Existing Categories"
    >
      <Category />
    </DashboardLayout>
  );
};

export default AdminCategoryPage;
