"use client"; // 👈 Marca este componente como Client Component

import React, { ReactElement } from "react";

interface IconButtonProps {
  icon: ReactElement;
  secondaryIcon?: ReactElement;
  onClick: () => void;
  ariaLabel: string;
  className?: string;
}

export const IconButton = ({
  icon,
  secondaryIcon,
  onClick,
  ariaLabel,
  className = "",
}: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition ${className}`}
    >
      {icon}
      {secondaryIcon && secondaryIcon}
    </button>
  );
};