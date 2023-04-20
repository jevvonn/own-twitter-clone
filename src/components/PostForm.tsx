import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { api } from "~/utils/api";
import toast from "react-hot-toast";

const PostForm = () => {
  const { data: session } = useSession();
  const [input, setInput] = useState("");

  const ctx = api.useContext();

  const { mutate } = api.post.create.useMutation({
    onSuccess() {
      setInput("");
      void ctx.post.getAll.invalidate();
    },
    onError(err) {
      const errMessage = err.data?.zodError?.fieldErrors.content;
      if (errMessage && errMessage[0]) toast.error(errMessage[0]);
    },
  });

  const handleSubmit = () => {
    mutate({ content: input });
  };

  return (
    <div className="border-b-[1px] border-b-gray-500">
      <div className="flex justify-between gap-2 p-4">
        <div>
          <div className="avatar">
            <div className="w-max rounded-full">
              <Image
                src={session?.user.image || ""}
                alt={session?.user.name || ""}
                width={40}
                height={40}
              />
            </div>
          </div>
        </div>
        <div className="w-full">
          <textarea
            className="textarea w-full resize-none border-none text-xl focus:border-none focus:outline-none"
            rows={3}
            placeholder="What's on your mind?"
            value={input}
            onChange={(e) => setInput(e.target.value.trimStart())}
          ></textarea>
          <div
            className={`divider my-1 ${
              input.length > 150 && "before:bg-red-700 after:bg-red-700"
            }`}
          />
          <div className="flex justify-between">
            <p className={`text-lg ${input.length > 150 && "text-red-500"}`}>
              {input.length}/150
            </p>
            <button
              className="btn-primary btn-sm btn rounded-full"
              onClick={handleSubmit}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
