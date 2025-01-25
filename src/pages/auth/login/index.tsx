import AuthLayout from "@/components/layouts/AuthLayout/AuthLayout";
import Login from "@/components/views/Auth/Login";

const LoginPage = () => {
    return (
        <AuthLayout title="HaikalDev | Login">
            <Login />
        </AuthLayout>
    );
};

export default LoginPage;