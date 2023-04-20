import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Header from "~/components/Header";
import PostForm from "~/components/PostForm";
import PostsList from "~/components/PostsList";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const { data: posts } = api.post.getAll.useQuery();

  return (
    <>
      <Head>
        <title>Create T3 App</title>
      </Head>

      <Header title="Home" />
      {session && <PostForm />}
      {posts && <PostsList posts={posts} />}
    </>
  );
};

export default Home;

// const AuthShowcase: React.FC = () => {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = api.example.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined },
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-white">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={sessionData ? () => void signOut() : () => void signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// };
