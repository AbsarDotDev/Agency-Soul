import React from "react";
import { Button } from "./ui/button";

interface ButtonWithIconProps {
  hoverColor: string;
  buttonText: string;
  icon: React.ReactNode;
}

const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
  hoverColor,
  buttonText,
  icon,
}) => {
  return (
    <Button className={`hover:${hoverColor}`}>
      {icon} {buttonText}
    </Button>
  );
};

export default ButtonWithIcon;
