import { Button } from "@/shared/ui/Button";

interface EmptyStateNodeProps {
  length: number;
  query: string;
}

export const EmptyStateNode = ({ length, query }: EmptyStateNodeProps) => {
  if (length > 0)
    return (
      <p className="mx-8 mt-3">
        No chats with <span className="font-semibold">{query}</span> found
      </p>
    );

  if (length < 0)
    return (
      <div className="h-full px-8 pt-3 flex flex-col gap-8 items-center justify-center">
        <p className="text-3xl text-center">
          You don&rsquo;t
          <br />
          have chats yet
        </p>
        <Button content="Send your first message" />
      </div>
    );
};
