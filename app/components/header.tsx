"use client";
import { Menu, Transition } from "@headlessui/react";
import { HomeIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Fragment } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const renderProfileIcon = (
  user:
    | {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
      }
    | undefined
) => {
  if (user?.image) {
    return <img src={user.image} className="rounded-full" />;
  } else if (user?.name) {
    return <img src={`https://ui-avatars.com/api/?name=${user.name}`} className="rounded-full" />;
  } else if (user?.email) {
    return <img src={`https://ui-avatars.com/api/?name=${user.email}`} className="rounded-full" />;
  }
  return <UserCircleIcon className="rounded-full" />;
};

export const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="flex justify-end w-full px-5 py-2 border-b-2 border-b-accent-500" id="header">
      <HomeIcon
        className="w-10 h-10 text-primary-400 animate-glow hover:cursor-pointer ml-0 mr-auto"
        onClick={() => router.push("/")}
      />
      <Menu as="div" className="relative">
        <Menu.Button className="w-10 h-10">{renderProfileIcon(session?.user)}</Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 grid w-56 grid-cols-1 origin-top-right bg-white divide-y rounded-md shadow-lg divide-secondary-500 dark:bg-slate-900 focus:outline-none">
            <Menu.Item>
              {({ active }) => {
                if (session?.user) {
                  return (
                    <Link href="/" onClick={() => signOut()} className={`p-2 rounded-md ${active && "bg-accent-500"}`}>
                      Sign Out
                    </Link>
                  );
                }
                return (
                  <Link href="/login" className={`p-2 rounded-md ${active && "bg-accent-500"}`}>
                    Login
                  </Link>
                );
              }}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
