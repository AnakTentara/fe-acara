import AuthLayout from "@/components/layouts/AuthLayout/AuthLayout";
import Register from "@/components/views/Auth/Register";

const RegisterPage = () => {
    return (
        <AuthLayout title="HaikalDev | Register">
            <Register />
        </AuthLayout>
    );
};

export default RegisterPage;