import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "~/server/api/root";
import PostItem from "./PostItem";

type Props = {
  posts: inferRouterOutputs<AppRouter>["post"]["getAll"];
};

const PostsList = ({ posts }: Props) => {
  return (
    <div className="flex flex-col">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostsList;
