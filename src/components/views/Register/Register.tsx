import Image from "next/image";
import { Spinner, Button, Input, Card, CardBody } from "@nextui-org/react";
import Link from "next/link";
import useRegister from "./useRegister";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Controller } from "react-hook-form";

const Register = () => {
    const { visiblePassword, handleVisiblePassword, control, handleSubmit, handleRegister, isPendingRegister, errors } = useRegister();
    return (
        <div className="flex w-full flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20">
            <div className="flex w-full lg:w-1/3 flex-col items-center justify-center gap-10">
                <Image src="/images/general/logo-black.png" alt="logo" width={180} height={180} />
                <Image src="/images/illustration/login.svg" className="w-2/3 lg:w-full" alt="logo" width={1024} height={1024} />
            </div>
            <Card>
                <CardBody className="p-8">
                    <h2 className="text-wl font-bold text-danger-500">Create Account</h2>
                    <p className="text-small mb-4">Have an account?&nbsp;
                        <Link href="/auth/login" className="font-semibold text-danger-400">login here</Link>
                    </p>
                    <form className="flex w-80 flex-col gap-1" onSubmit={handleSubmit(handleRegister)}>
                        <Controller name="fullName"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="text"
                                label="Fullname"
                                variant="bordered"
                                autoComplete="off"
                                isInvalid={errors.fullName !== undefined}
                                errorMessage={errors.fullName?.message}
                            />
                        )} />
                        <Controller name="username" control={control} render={({ field }) => (
                            <Input
                                {...field}
                                type="text"
                                label="username"
                                variant="bordered"
                                autoComplete="off"
                                isInvalid={errors.username !== undefined}
                                errorMessage={errors.username?.message}
                            />
                        )} />
                        <Controller name="email" control={control} render={({ field }) => (
                            <Input
                                {...field}
                                type="email"
                                label="Email"
                                variant="bordered"
                                autoComplete="off"
                                isInvalid={errors.email !== undefined}
                                errorMessage={errors.email?.message}
                            />
                        )} />
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type={visiblePassword.password ? 'text' : 'password'}
                                    label="Password"
                                    variant="bordered"
                                    autoComplete="off"
                                    isInvalid={errors.password !== undefined}
                                    errorMessage={errors.password?.message}
                                    endContent={
                                        <button
                                            className="focus:outline-none"
                                            type="button"
                                            onClick={() => handleVisiblePassword("password")}
                                        >
                                            {visiblePassword.password ? <FaEye className="pointer-events-none text-xl text-default-400" /> : <FaEyeSlash className="pointer-events-none text-xl text-default-400" />}
                                        </button>
                                }/>
                            )}>
                        </Controller>
                        <Controller
                            name="confirmPassword"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type={visiblePassword.confirmPassword ? 'text' : 'password'}
                                    label="Password Confirmation"
                                    variant="bordered"
                                    autoComplete="off"
                                    isInvalid={errors.confirmPassword !== undefined}
                                    errorMessage={errors.confirmPassword?.message}
                                    endContent={
                                        <button
                                            className="focus:outline-none"
                                            type="button"
                                            onClick={() => handleVisiblePassword("confirmPassword")}
                                        >
                                            {visiblePassword.password ? <FaEye className="pointer-events-none text-xl text-default-400" /> : <FaEyeSlash className="pointer-events-none text-xl text-default-400" />}
                                        </button>
                                } />
                            )}>
                        </Controller>
                        <Button color="danger" size="lg" type="submit">
                            {isPendingRegister ? (
                                <Spinner size="sm" color="danger" className="mr-2" />
                            ) : (
                                "Register"
                            )}
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
};

export default Register;