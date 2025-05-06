import { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  // "password" turini qo'shamiz
  type?: "text" | "number" | "date" | "password" | "email"; // "email" ni ham qo'shish foydali bo'lishi mumkin
}
