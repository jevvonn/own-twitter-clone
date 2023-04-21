import {
  IconHome,
  IconBrandTwitterFilled,
  IconUser,
  IconBrandGoogle,
  IconLogout,
} from "@tabler/icons-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const LeftSide = () => {
  const styleMainLink =
    "btn flex w-max items-center justify-between gap-2  rounded-full border-none bg-transparent text-xl normal-case hover:bg-neutral";

  const { data: session, status } = useSession();

  return (
    <>
      <aside className="fixed bottom-0 z-30 flex w-full justify-center gap-4 border-t border-t-gray-500 bg-base-100 px-2 py-4 md:sticky md:top-0 md:h-screen md:w-1/4 md:flex-col md:justify-normal md:border-t-0">
        <div className="btn hidden w-max rounded-full border-none bg-transparent hover:bg-neutral md:block">
          <IconBrandTwitterFilled size={30} />
        </div>
        <div className="flex gap-2 md:flex-col">
          <Link href="/" className={styleMainLink}>
            <IconHome size={30} />
            <span>Home</span>
          </Link>
          {!session && status !== "loading" && (
            <label htmlFor="sign-in" className={styleMainLink}>
              <IconUser size={30} />
              <span>Sign In</span>
            </label>
          )}
        </div>
        {!!session && (
          <div className="flex items-center gap-4 ">
            <div className="dropdown-top dropdown-end dropdown ">
              <label tabIndex={0} className={styleMainLink}>
                <div className="avatar">
                  <div className="rounded-full">
                    <Image
                      src={session.user.image || ""}
                      alt={session.user.name || ""}
                      width={30}
                      height={30}
                    />
                  </div>
                </div>
                <div>{session.user?.name}</div>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu mb-2 w-52 rounded-lg bg-base-200 p-2 shadow"
              >
                <li>
                  <button onClick={() => signOut()}>
                    <IconLogout size={20} />
                    <span>Sign Out</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </aside>

      {!session && (
        <>
          <input type="checkbox" id="sign-in" className="modal-toggle" />
          <label htmlFor="sign-in" className="modal">
            <label className="modal-box relative" htmlFor="">
              <label
                htmlFor="sign-in"
                className="btn-sm btn-circle btn absolute right-2 top-2"
              >
                ✕
              </label>
              <h3 className="text-2xl font-bold">Sign In!</h3>
              <p>It{`'`}s easier to sign in right now.</p>
              <div className="mt-6 flex flex-col gap-3">
                <button
                  className="btn-outline btn flex gap-2 text-lg normal-case"
                  onClick={() => signIn("google")}
                >
                  <IconBrandGoogle size={20} /> Continue with Google
                </button>
                <button
                  className="btn-outline btn flex gap-2 text-lg normal-case"
                  onClick={() => signIn("twitter")}
                >
                  <IconBrandTwitterFilled size={20} /> Continue with Twitter
                </button>
              </div>
            </label>
          </label>
        </>
      )}
    </>
  );
};

export default LeftSide;
