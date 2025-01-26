import { Button, Listbox, ListboxItem } from "@heroui/react";
import { signOut } from "next-auth/react";
import { CiLogout } from "react-icons/ci";
import Image from "next/image";
import { useRouter } from "next/router";
import { cn } from "@/utils/cn";
import { JSX } from "react";
import Link from "next/link";

interface SidebarItem {
  key: string;
  label: string;
  href: string;
  icon: JSX.Element;
}

interface PropTypes {
  sidebarItems: SidebarItem[];
  isOpen: boolean;
}

const DashboardLayoutSidebar = (props: PropTypes) => {
  const { sidebarItems, isOpen } = props;
  const router = useRouter();
  return (
    <div className={cn(
        "fixed lg:relative z-50 flex h-screen w-full max-w-[250px] -translate-x-full flex-col justify-between border-r-1 border-default-200 bg-white px-4 py-6 transition-all lg:-translate-x-0",
        {"translate-x-0" : isOpen}
    )}>
      <div className="flex justify-center w-full">
        <Image
          src="/images/general/logo-black.png"
          alt="logo"
          width={210}
          height={70}
          className="mb-6 w-32"
          onClick={() => router.push("/")}
        />
        </div>
        <Listbox
          items={sidebarItems}
          variant="solid"
          aria-label="Dashboard Menu"
        >
      {(item) => (
            <ListboxItem
              key={item.key}
              className={cn("my-1 h-12 text-2xl", {
                "bg-danger-500 text-white": router.pathname.startsWith(
                    item.href,
                ),
              })}
              startContent={item.icon}
              textValue={item.label}
              aria-labelledby={item.label}
              aria-describedby={item.label}
              as={Link}
              href={item.href}
            >
              <p className="text-small">{item.label}</p>
            </ListboxItem>
        )}
        </Listbox>
      <div className="flex items-center p-1">
        <Button
          color="danger"
          fullWidth
          variant="light"
          className="flex justify-start rounded-lg px-2 py-1.5"
          size="lg"
          onPress={() => signOut()}
        >
          <CiLogout />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default DashboardLayoutSidebar;
