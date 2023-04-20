import {
  IconHome,
  IconBrandTwitterFilled,
  IconUser,
  IconBrandGoogle,
  IconLogout,
  IconDots,
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
      <aside className="sticky top-0 flex h-screen w-1/4 flex-col gap-4 py-4">
        <div className="btn w-max rounded-full border-none bg-transparent hover:bg-neutral">
          <IconBrandTwitterFilled size={30} />
        </div>
        <div className="flex flex-col gap-2" style={{ flex: "1 1 0" }}>
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
            <div className={styleMainLink}>
              <div className="avatar">
                <div className=" rounded-full">
                  <Image
                    src={session.user.image || ""}
                    alt={session.user.name || ""}
                    width={30}
                    height={30}
                  />
                </div>
              </div>
              <div>{session.user?.name}</div>
            </div>
            <div className="dropdown-top dropdown-end dropdown">
              <label tabIndex={0} className={styleMainLink}>
                <IconDots size={30} />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu w-52 rounded-lg bg-base-200 p-2 shadow"
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
