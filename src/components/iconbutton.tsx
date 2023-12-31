import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

interface ButtonWithIconProps {
  hoverColor: string;
  buttonText: string;
  icon: React.ReactNode;
  link:string
}

const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
  hoverColor,
  buttonText,
  icon,
  link
}) => {
  return (
    <Button className={`hover:${hoverColor}`}>
      {icon}
      <Link href={`${link}`}>{buttonText}</Link>
    </Button>
  );
};

export default ButtonWithIcon;
