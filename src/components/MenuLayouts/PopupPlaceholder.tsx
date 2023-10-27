interface PopupPlaceholderProps {
  text: string;
}

export function PopupPlaceholder({ text }: PopupPlaceholderProps) {
  const sentences = text.split(new RegExp(`(?=([\.(!\?)\?]+))`));
  return (
    <div className="w-full flex items-center justify-center h-[40vh]">
      <p className="text-neutral-500 text-center font-bold text-lg">{text}</p>
    </div>
  );
}
