import { IconTrash } from "@tabler/icons-react";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { inferRouterOutputs } from "@trpc/server";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { AppRouter } from "~/server/api/root";
import { api } from "~/utils/api";

type Props = {
  comment: inferRouterOutputs<AppRouter>["comment"]["getAll"][number];
};

const CommentItem = ({ comment }: Props) => {
  const ctx = api.useContext();
  const { data: session } = useSession();
  const { mutate: mutateLikeComment } = api.comment.like.useMutation({
    onSuccess() {
      void ctx.comment.invalidate();
    },
    onError(err) {
      console.log(err);
    },
  });
  const { mutate: mutateDeleteComment } = api.comment.delete.useMutation({
    onSuccess() {
      void ctx.comment.invalidate();
      toast.success("Comment deleted successfully");
    },
    onError(err) {
      console.log(err);
    },
  });

  const handleLike = () => {
    if (!session) return toast.error("Please login to like a comment");
    mutateLikeComment({
      commentId: comment.id,
      isLiked: !!comment.likedBy?.length,
    });
  };

  return (
    <div className="border-b-[1px] border-b-gray-500">
      <div className="flex gap-2 p-4">
        <div className="w-max">
          <div className="avatar">
            <div className="w-max rounded-full">
              <Image
                src={comment.user.image || ""}
                alt={comment.user.name || ""}
                width={40}
                height={40}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-grow flex-col">
          <p className="text-lg font-semibold">@{comment.user.name}</p>
          <div className="min-h-12 w-full break-all">
            <span className="text-lg">{comment.content}</span>
          </div>
          <div className="mt-2 flex gap-4">
            <button className="flex items-center gap-2" onClick={handleLike}>
              {!comment.likedBy?.length ? (
                <IconHeart />
              ) : (
                <IconHeartFilled className="text-red-500" />
              )}{" "}
              <span className="text-lg font-semibold">
                {comment._count.likedBy}
              </span>
            </button>
            {session && session.user.id === comment.user.id && (
              <button
                onClick={() =>
                  mutateDeleteComment({
                    commentId: comment.id,
                    commentUserId: comment.user.id,
                  })
                }
              >
                <IconTrash />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
