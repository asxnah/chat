import { formatDateTime } from "./utils/formatDateTime";

interface ChatProps {
  src: string;
  name: string;
  datetime: string;
  msg: string;
  counter: number;
}

export const Chat = ({ src, name, datetime, msg, counter }: ChatProps) => {
  return (
    <div className="px-8 py-3 flex gap-2.5">
      <img src={src} alt="avatar" className="w-13.5 h-13.5 rounded-full" />
      <div className="grow flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h6 className="font-bold">{name}</h6>
          <p className="text-sm text-darkgrey">{formatDateTime(datetime)}</p>
        </div>
        <div className="flex items-center justify-between">
          <p>{msg}</p>
          {counter > 0 && (
            <div className="rounded-full bg-black px-[5px] py-px">
              <p className="text-white text-xs font-bold">{counter}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
