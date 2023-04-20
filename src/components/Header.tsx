import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/router";

type Props = {
  title: string;
  useBackIcon?: boolean;
};

const Header = ({ title, useBackIcon }: Props) => {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-20 border-b-[1px] border-b-gray-500 bg-base-100">
      <div className="flex gap-1 p-4">
        {useBackIcon && (
          <button
            className="btn-ghost btn-sm btn-circle btn rounded-full"
            onClick={() => router.back()}
          >
            <IconArrowNarrowLeft />
          </button>
        )}
        <h1 className=" text-xl font-semibold">{title}</h1>
      </div>
    </div>
  );
};

export default Header;
