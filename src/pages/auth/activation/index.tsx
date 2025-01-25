import AuthLayout from "@/components/layouts/AuthLayout/AuthLayout"
import authServices from "@/services/auth.service";
import Activation from "@/components/views/Auth/Activation";

interface PropTypes {
    status: 'success' | 'failed';
}

const ActivationPage = (props: PropTypes) => {
    return (
        <AuthLayout title="HaikalDev | Activation">
            <Activation {...props}/>
        </AuthLayout>
    );
};

export async function getServerSideProps(context: { query: { code: string } }) {
    try {
        const result = await authServices.activation({ code: context.query.code })
        if (result.data.data) {
            return {
                props: {
                    status: "success",
                },
            };
        } else {
            return {
                props: {
                    status: "failed",
                },
            };
        }
    } catch (error) {
        return {
            props: {
                status: "failed",
            },
        };
    }
};

export default ActivationPage;