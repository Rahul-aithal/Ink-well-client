import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export function cn(...inputs) {
  return twMerge(clsx(...inputs));
}

export function createToast(contents, type = "default",theme="light") {
  return toast(contents, {
    type,
    closeButton: true,
    position: "top-center",
    theme: theme,
  });
}
