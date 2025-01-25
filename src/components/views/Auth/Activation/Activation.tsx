import Image from "next/image"
import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";

interface PropTypes {
    status: 'success' | 'failed';
};

const Activation = (props: PropTypes) => {
    const router = useRouter();
    const { status } = props;
    return (
        <div className="flex flex-col items-center justify-center gap-10 p-4">
            <div className="flex flex-col items-center justify-center gap-10">
                <Image src="/images/general/logo-black.png" alt="logo" width={180} height={180} />
                <Image
                src={
                    status === "success" 
                    ? "/images/illustration/success.svg" 
                    : "/images/illustration/pending.svg"
                }
                className="w-1/2 lg:w-1/2" alt="status" width={50} height={50} />
            </div>
            <div className="flex flex-col items-center justify-center gap-10">
            <h1 className="text-3xl font-bold text-danger-500">
                {
                    status === "success" 
                    ? "Activation Success! :D" 
                    : "Activation Failed! :("
                }
            </h1>
            <p className="text-xl font-bold text-default-500">{
                    status === "success" 
                    ? "Thank you for register account! :D" 
                    : "Confirmation Code is Invalid!"
                }</p>
            <Button className="mt-2 w-fit" variant="bordered" color="danger" onClick={() => router.push('/')}>
                Back To Home
            </Button>
            </div>
        </div>
    );
};

export default Activation;