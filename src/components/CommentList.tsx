import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "~/server/api/root";
import CommentItem from "./CommentItem";

type Props = {
  comments: inferRouterOutputs<AppRouter>["comment"]["getAll"];
};

const CommentList = ({ comments }: Props) => {
  return (
    <div className="flex flex-col">
      {comments.map((comment) => (
        <CommentItem comment={comment} key={comment.id} />
      ))}
    </div>
  );
};

export default CommentList;
