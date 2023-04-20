import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import CommentForm from "~/components/CommentForm";
import CommentList from "~/components/CommentList";
import Header from "~/components/Header";
import PostItem from "~/components/PostItem";
import { api } from "~/utils/api";

const PostPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: post } = api.post.getSingle.useQuery({ postId: id as string });
  const { data: comments } = api.comment.getAll.useQuery({
    postId: id as string,
  });
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>
          Post by {post?.user.name} : {post?.content}
        </title>
      </Head>

      <div>
        <Header title="Post" useBackIcon={true} />

        {post && <PostItem post={post} />}
        {session && post && <CommentForm postId={post.id} />}
        {post && post._count.comments === 0 && (
          <div className="mt-5 text-center text-gray-500">No comments yet</div>
        )}
        {comments && comments.length !== 0 && (
          <>
            <div className="border-b border-b-gray-500 py-2 text-center text-lg font-semibold">
              Comments
            </div>
            <CommentList comments={comments} />
          </>
        )}
      </div>
    </>
  );
};

export default PostPage;
