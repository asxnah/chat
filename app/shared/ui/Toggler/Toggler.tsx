type TogglerProps = {
  content: string;
  checked: boolean;
  onToggle: () => void;
};

export const Toggler = ({ content, checked, onToggle }: TogglerProps) => {
  return (
    <div className="flex items-center justify-between px-8 py-3">
      <p>{content}</p>
      <button type="button" onClick={onToggle}>
        <svg
          className="cursor-pointer"
          width="32"
          height="16"
          viewBox="0 0 32 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            className="pointer-events-none fill-(--stroke)"
            width="32"
            height="16"
            rx="8"
          />
          <circle
            className={`${
              checked ? "translate-x-4" : "translate-x-0"
            } pointer-events-none duration-200`}
            cx="8"
            cy="8"
            r="8"
            fill={checked ? "var(--black)" : "var(--lightgrey)"}
          />
        </svg>
      </button>
    </div>
  );
};
