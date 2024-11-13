"use client";

import React, { useState } from "react";
import Logo, { LogoMobile } from "./Logo";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { UserButton } from "@clerk/nextjs";

import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import { ThemeSwitcherBtn } from "./ThemeSwitchBtn";

const AdminNavBar = () => {
  return (
    <>
      <AdminDesktopNavBar />
      <AdminMobileNavBar />
    </>
  );
};

const items = [
  { label: "Admin Dashboard", link: "/admin/dashboard" },
  {label: "Appointment Applications", link: "/admin/dashboard/applications"}
  
  
];

const AdminMobileNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="blick border-separate bg-background md:hidden">
      <nav className="container flex items-center justify-between px-8">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]" side="left">
            <Logo />
            <div className="flex flex-col gap-1 pt-4">
              {items.map((item) => (
                <NavBarItem
                  key={item.label}
                  link={item.link}
                  label={item.label}
                  clickCallback={() => setIsOpen((prev) => !prev)}
                />
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
          <LogoMobile />
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitcherBtn />
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </nav>
    </div>
  );
};

const AdminDesktopNavBar = () => {
  return (
    <div className="hidden border-separate border-b bg-background md:block">
  <nav className="container mx-auto flex items-center justify-between px-8 gap-x-32">
    <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
      <Logo />
      <div className="flex h-full">
        {items.map((item) => (
          <NavBarItem
            key={item.label}
            link={item.link}
            label={item.label}
          />
        ))}
      </div>
    </div>
    <div className="flex items-center gap-5">
      <ThemeSwitcherBtn />
      <UserButton afterSignOutUrl="/sign-in" />
    </div>
  </nav>
</div>
  );
};

const NavBarItem = ({
  link,
  label,
  clickCallback,
}: {
  link: string;
  label: string;
  clickCallback?: () => void;
}) => {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <div className="relative flex items-center">
      <Link
        href={link}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "w-full justify-start text-lg text-muted-foreground hover:text-foreground",
          isActive && "text-foreground"
        )}
        onClick={() => {
            if (clickCallback) clickCallback()
        }}
      >
        {label}
      </Link>
      {isActive && (
        <div className="absolute -bottom-[2px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-xl bg-foreground md:block" />
      )}
    </div>
  );
};

export default AdminNavBar;