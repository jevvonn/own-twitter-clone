import {
  IconHeart,
  IconHeartFilled,
  IconMessage2,
  IconTrash,
} from "@tabler/icons-react";
import { inferRouterOutputs } from "@trpc/server";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { AppRouter } from "~/server/api/root";
import { api } from "~/utils/api";

type Props = {
  post: inferRouterOutputs<AppRouter>["post"]["getAll"][number];
};

const PostItem = ({ post }: Props) => {
  const ctx = api.useContext();
  const router = useRouter();
  const { data: session } = useSession();
  const { mutate: mutateLikePost } = api.post.like.useMutation({
    onSuccess() {
      void ctx.post.invalidate();
    },
    onError(err) {
      console.log(err);
    },
  });
  const { mutate: mutateDeletePost } = api.post.delete.useMutation({
    onSuccess() {
      toast.success("Post deleted successfully");
      void ctx.post.invalidate();
      router.push("/");
    },
    onError(err) {
      console.log(err);
    },
  });

  const handleLike = () => {
    if (!session) return toast.error("Please login to like a post");
    mutateLikePost({ postId: post.id, isLiked: !!post.likedBy?.length });
  };

  return (
    <div className="border-b-[1px] border-b-gray-500">
      <div className="flex gap-2 p-4">
        <div className="w-max">
          <div className="avatar">
            <div className="w-max rounded-full">
              <Image
                src={post.user.image || ""}
                alt={post.user.name || ""}
                width={40}
                height={40}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-grow flex-col">
          <p className="text-lg font-semibold">@{post.user.name}</p>
          <div className="min-h-12 w-full break-all">
            <span className="text-lg">{post.content}</span>
          </div>
          <div className="mt-2 flex gap-4">
            <button className="flex items-center gap-2" onClick={handleLike}>
              {!post.likedBy?.length ? (
                <IconHeart />
              ) : (
                <IconHeartFilled className="text-red-500" />
              )}{" "}
              <span className="text-lg font-semibold">
                {post._count.likedBy}
              </span>
            </button>
            <Link
              href={`/post/${post.id}`}
              shallow={true}
              className="flex items-center gap-2"
            >
              <IconMessage2 />{" "}
              <span className="text-lg font-semibold">
                {post._count.comments}
              </span>
            </Link>
            {session && session.user.id === post.user.id && (
              <button
                onClick={() =>
                  mutateDeletePost({
                    postId: post.id,
                    postUserId: post.user.id,
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

export default PostItem;
