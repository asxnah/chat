import { ChevronRight } from "lucide-react";

interface LinkProps {
  text: string;
  onClick?: () => void;
  destination?: string;
}

export const ActionButton = ({ text, onClick, destination }: LinkProps) => {
  const Component = destination ? "a" : "button";

  return (
    <Component
      className="w-full py-3 px-8 flex items-center justify-between"
      href={destination}
      onClick={onClick}
    >
      <span>{text}</span>
      <ChevronRight className="width-2.5 height-4 stroke-lightgrey" />
    </Component>
  );
};
