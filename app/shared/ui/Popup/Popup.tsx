import type { ReactNode } from "react";
import { X } from "lucide-react";

interface PopupProps {
  heading: string;
  children: ReactNode;
  onClose: () => void;
}

export const Popup = ({ heading, children, onClose }: PopupProps) => {
  return (
    <section className="absolute top-0 left-0 z-10 w-full h-full grid place-content-center bg-(--screen-dim)">
      <div className="relative p-8 w-128 flex flex-col gap-8 rounded-2xl bg-(--white)">
        <div className="flex items-center justify-between">
          <h3 className="text-(--black) text-xl font-semibold">{heading}</h3>
          <button className="cursor-pointer" type="button" onClick={onClose}>
            <X className="stroke-(--lightgrey)" />
          </button>
        </div>
        {children}
      </div>
    </section>
  );
};
