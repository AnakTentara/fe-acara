import Image from "next/image"
import { Button } from "@heroui/react";
import { useRouter } from "next/router";

const RegisterSuccess = () => {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center gap-10 p-4">
            <div className="flex flex-col items-center justify-center gap-10">
                <Image src="/images/general/logo-black.png" alt="logo" width={180} height={180} />
                <Image src="/images/illustration/email-send.svg" className="w-1/2 lg:w-1/2" alt="success" width={50} height={50} />
            </div>
            <div className="flex flex-col items-center justify-center gap-10">
            <h1 className="text-3xl font-bold text-danger-500">Create Account Success</h1>
            <p className="text-xl font-bold text-default-500">check your email for account activation</p>
            <Button className="mt-2 w-fit" variant="bordered" color="danger" onClick={() => router.push('/')}>
                Back To Home
            </Button>
            </div>
        </div>
    );
};

export default RegisterSuccess;