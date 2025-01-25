import { Inter } from "next/font/google";
import { Button } from '@nextui-org/react';
import PageHead from "@/components/commons/PageHead";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <PageHead title="Haikal Devlop"/>
      <Button color="primary" href="/member">Open Member Dashboard</Button>
      <Button color="primary" href="/admin">Open Admin Dashboard</Button>
    </main>
  );
}
