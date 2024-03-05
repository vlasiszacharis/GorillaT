import { ReactNode } from "react";

export interface ButtonProps {
  message: string;
  bgColor: string;
  hoverBgColor: string;
  textColor: string;
  icon?: ReactNode;
}
