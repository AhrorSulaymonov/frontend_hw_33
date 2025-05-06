import { ReactElement, ButtonHTMLAttributes } from "react"; // ButtonHTMLAttributes ni import qiling

export interface ButtonProps {
  children?: ReactElement | string;
  title?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  href?: string;
  // type atributini HTML button elementining type atributiga moslashtiramiz
  type?: "button" | "submit" | "reset";
}
