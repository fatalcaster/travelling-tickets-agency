import { Companion } from "@/lib/types/Companion";
import { CSSProperties } from "react";
import { TrashCan } from "../Icons";
import CompanionList from "./CompanionList";
import { PopupPlaceholder } from "./PopupPlaceholder";

interface CompanionMenuProps {
  className?: string;
  style?: CSSProperties;
  data: Companion[];
  onDelete: (comp: Companion) => void;
}
export default function CompanionMenuLayout({
  data,
  onDelete,
}: CompanionMenuProps) {
  if (data.length)
    return (
      <CompanionList
        className="mt-4 h-[40vh]"
        actionIcon={<TrashCan className="w-5 h-5" />}
        data={data}
        action={onDelete}
      />
    );

  return <PopupPlaceholder text="Travelling is more fun with friends!" />;
}
