import { Inter } from "next/font/google";
import { Button } from "@heroui/react";
import PageHead from "@/components/commons/PageHead";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <PageHead title="Haikal Devlop"/>
      <Button color="primary"><a href="/member">Open Member Dashboard</a></Button>
      <Button color="primary"><a href="/admin">Open Admin Dashboard</a></Button>
    </main>
  );
};