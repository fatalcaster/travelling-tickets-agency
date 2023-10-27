import { ReactNode } from "react";

interface ConfirmationMenuLayoutProps {
  onConfirm: () => void;
  onReject: () => void;
  children?: ReactNode;
  title?: string;
  invertColors?: boolean;
}

export function ConfirmationMenuLayout({
  children,
  title,
  onReject,
  onConfirm,
  invertColors = false,
}: ConfirmationMenuLayoutProps) {
  const greenStyle = "bg-green-900 text-green-400";
  const redStyle = "bg-red-900 text-red-400";
  const btnStyle = "w-24 py-2 rounded-2xl";
  return (
    <div className="text-white text-center pt-4 flex flex-col items-center">
      {children ? children : title}
      <div className="flex justify-between py-4 gap-4 ">
        <button
          onClick={onConfirm}
          className={`${invertColors ? redStyle : greenStyle} ${btnStyle}`}
        >
          Yes
        </button>
        <button
          className={`${invertColors ? greenStyle : redStyle} ${btnStyle}`}
          onClick={onReject}
        >
          No
        </button>
      </div>
    </div>
  );
}
