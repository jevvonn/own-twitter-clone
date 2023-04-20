import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { api } from "~/utils/api";
import toast from "react-hot-toast";

type Props = {
  postId: string;
};

const CommentForm = ({ postId }: Props) => {
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const [inputFocus, setInputFocus] = useState(false);

  const ctx = api.useContext();

  const { mutate } = api.comment.create.useMutation({
    onSuccess() {
      setInput("");
      void ctx.post.invalidate();
      void ctx.comment.invalidate();
    },
    onError(err) {
      console.log(err);
    },
  });

  const handleSubmit = () => {
    mutate({ content: input, postId });
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
            rows={inputFocus ? 3 : 1}
            onFocus={() => setInputFocus(true)}
            onBlur={() => !input.length && setInputFocus(false)}
            placeholder="What do you think?"
            value={input}
            onChange={(e) => setInput(e.target.value.trimStart())}
          ></textarea>
          <div className="flex justify-end">
            <button
              className="btn-primary btn-sm btn rounded-full"
              onClick={handleSubmit}
            >
              Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
