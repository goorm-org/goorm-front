"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { Button } from "@vapor-ui/core";

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();

  const setActiveColor = useMemo(() => {
    return (route: string) =>
      pathname.startsWith(route) ? "text-primary-700" : "text-gray-400";
  }, [pathname]);

  return (
    <nav className="fixed bottom-0 left-1/2 z-10 h-20 max-w-[393px] w-full -translate-x-1/2 bg-white">
      <ul className="flex items-center justify-around h-full">
        <li>
          <Button
            className="flex flex-col items-center justify-center gap-2 h-full w-full p-1"
            variant="ghost"
            onClick={() => router.push("/explore")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              className={setActiveColor("/explore")}
            >
              <path
                d="M20.35 21L14.05 14.7C13.55 15.1 12.975 15.4167 12.325 15.65C11.675 15.8833 10.9833 16 10.25 16C8.43333 16 6.89583 15.3708 5.6375 14.1125C4.37917 12.8542 3.75 11.3167 3.75 9.5C3.75 7.68333 4.37917 6.14583 5.6375 4.8875C6.89583 3.62917 8.43333 3 10.25 3C12.0667 3 13.6042 3.62917 14.8625 4.8875C16.1208 6.14583 16.75 7.68333 16.75 9.5C16.75 10.2333 16.6333 10.925 16.4 11.575C16.1667 12.225 15.85 12.8 15.45 13.3L21.75 19.6L20.35 21ZM10.25 14C11.5 14 12.5625 13.5625 13.4375 12.6875C14.3125 11.8125 14.75 10.75 14.75 9.5C14.75 8.25 14.3125 7.1875 13.4375 6.3125C12.5625 5.4375 11.5 5 10.25 5C9 5 7.9375 5.4375 7.0625 6.3125C6.1875 7.1875 5.75 8.25 5.75 9.5C5.75 10.75 6.1875 11.8125 7.0625 12.6875C7.9375 13.5625 9 14 10.25 14Z"
                fill="currentColor"
              />
            </svg>
            <span className={clsx("text-xs", setActiveColor("/explore"))}>
              Explore
            </span>
          </Button>
        </li>
        <li>
          <Button
            className="flex flex-col items-center justify-center gap-2 h-full w-full p-1"
            variant="ghost"
            onClick={() => router.push("/map")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              className={setActiveColor("/map")}
            >
              <path
                d="M12.084 22C11.8507 22 11.6507 21.9333 11.484 21.8C11.3173 21.6667 11.1923 21.4917 11.109 21.275C10.7923 20.3417 10.3923 19.4667 9.90899 18.65C9.44232 17.8333 8.78398 16.875 7.93398 15.775C7.08398 14.675 6.39232 13.625 5.85898 12.625C5.34232 11.625 5.08398 10.4167 5.08398 9C5.08398 7.05 5.75898 5.4 7.10898 4.05C8.47565 2.68333 10.134 2 12.084 2C14.034 2 15.684 2.68333 17.034 4.05C18.4007 5.4 19.084 7.05 19.084 9C19.084 10.5167 18.7923 11.7833 18.209 12.8C17.6423 13.8 16.984 14.7917 16.234 15.775C15.334 16.975 14.6507 17.975 14.184 18.775C13.734 19.5583 13.359 20.3917 13.059 21.275C12.9757 21.5083 12.8423 21.6917 12.659 21.825C12.4923 21.9417 12.3007 22 12.084 22ZM12.084 18.425C12.3673 17.8583 12.684 17.3 13.034 16.75C13.4007 16.2 13.934 15.4667 14.634 14.55C15.3507 13.6167 15.934 12.7583 16.384 11.975C16.8507 11.175 17.084 10.1833 17.084 9C17.084 7.61667 16.5923 6.44167 15.609 5.475C14.6423 4.49167 13.4673 4 12.084 4C10.7007 4 9.51732 4.49167 8.53399 5.475C7.56732 6.44167 7.08398 7.61667 7.08398 9C7.08398 10.1833 7.30898 11.175 7.75898 11.975C8.22565 12.7583 8.81732 13.6167 9.53399 14.55C10.234 15.4667 10.759 16.2 11.109 16.75C11.4757 17.3 11.8007 17.8583 12.084 18.425ZM12.084 11.5C12.784 11.5 13.3757 11.2583 13.859 10.775C14.3423 10.2917 14.584 9.7 14.584 9C14.584 8.3 14.3423 7.70833 13.859 7.225C13.3757 6.74167 12.784 6.5 12.084 6.5C11.384 6.5 10.7923 6.74167 10.309 7.225C9.82565 7.70833 9.58398 8.3 9.58398 9C9.58398 9.7 9.82565 10.2917 10.309 10.775C10.7923 11.2583 11.384 11.5 12.084 11.5Z"
                fill="currentColor"
              />
            </svg>
            <span className={clsx("text-xs", setActiveColor("/map"))}>Map</span>
          </Button>
        </li>
        <li>
          <Button
            className="flex flex-col items-center justify-center gap-2 h-full w-full p-1"
            variant="ghost"
            onClick={() => router.push("/saved")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              className={setActiveColor("/saved")}
            >
              <path
                d="M5.41602 21V5C5.41602 4.45 5.61185 3.97917 6.00352 3.5875C6.39518 3.19583 6.86602 3 7.41602 3H17.416C17.966 3 18.4368 3.19583 18.8285 3.5875C19.2202 3.97917 19.416 4.45 19.416 5V21L12.416 18L5.41602 21ZM7.41602 17.95L12.416 15.8L17.416 17.95V5H7.41602V17.95Z"
                fill="currentColor"
              />
            </svg>
            <span className={clsx("text-xs", setActiveColor("/saved"))}>
              Explore
            </span>
          </Button>
        </li>
      </ul>
    </nav>
  );
}
