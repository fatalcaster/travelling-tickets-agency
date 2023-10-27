import { CSSProperties, ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { XIcon } from "@/components/Icons";
interface usePopupMenuProps {}
export function usePopupMenu() {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const setMenuActive = () => {
    setIsMenuActive(true);
  };
  const setMenuInactive = () => {
    setIsMenuActive(false);
  };

  const T = (
    props: Omit<MenuWrapperProps, "setMenuInactive" | "isMenuActive">
  ) => (
    <MenuWrapper
      {...props}
      setMenuInactive={setMenuInactive}
      isMenuActive={isMenuActive}
    />
  );

  return { MenuWrapper: T, setMenuActive, setMenuInactive };
}
interface MenuWrapperProps {
  children?: ReactNode;
  menuLayout?: ReactNode;
  title?: string;
  isMenuActive: boolean;
  className?: string;
  style?: CSSProperties;
  setMenuInactive: () => void;
}
function MenuWrapper({
  children,
  menuLayout,
  title,
  isMenuActive,
  style,
  className,
  setMenuInactive,
}: MenuWrapperProps) {
  return (
    <>
      {children}
      {isMenuActive && (
        <PopupMenu
          style={style}
          className={className}
          children={menuLayout}
          title={title}
          onClose={setMenuInactive}
        />
      )}
    </>
  );
}

interface PopupMenuProps {
  onClose: () => void;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  title?: string;
}

function PopupMenu({
  onClose,
  className,
  style,
  children,
  title,
}: PopupMenuProps) {
  return (
    <div className={`fixed m-auto top-0 left-0 z-30 h-screen w-screen `}>
      <div
        className="absolute top-0  w-full h-full bg-[rgba(0,0,0,0.4)] "
        onClick={onClose}
      ></div>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        style={style}
        className={` rounded-2xl h-fit bg-black w-1/2 min-w-[300px] max-w-[350px] px-4 inset-0 m-auto absolute lg:pb-4 overflow-hidden ${className}`}
      >
        <div className=" flex relative justify-center w-full ">
          <p className="text-white mt-[10%] text-center font-bold text-lg">
            {title}
          </p>
          <button
            className="absolute -right-2 top-2 text-white"
            onClick={onClose}
          >
            <XIcon />
          </button>
        </div>
        <div>{children}</div>
      </motion.div>
    </div>
  );
}
