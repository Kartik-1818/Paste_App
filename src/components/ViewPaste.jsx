import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();

  // 🧠 Get from localStorage instead of Redux
  const storedPastes = JSON.parse(localStorage.getItem("pastes")) || [];
  const paste = storedPastes.find((paste) => paste._id === id);

  if (!paste) {
    return (
      <div className="w-full h-full flex items-center justify-center text-2xl font-bold">
        Paste not found
      </div>
    );
  }

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-5 items-start">
        <input
          type="text"
          placeholder="Title"
          value={paste.title}
          disabled
          className="w-full text-black border border-input rounded-md p-2"
        />

        <div className="w-full flex flex-col items-start relative rounded bg-opacity-10 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl">
          <div className="w-full rounded-t flex items-center justify-between px-4 py-2 border-b border-[rgba(128,121,121,0.3)]">
            <div className="flex gap-x-[6px] items-center select-none group">
              <div className="w-[13px] h-[13px] rounded-full bg-[rgb(255,95,87)]" />
              <div className="w-[13px] h-[13px] rounded-full bg-[rgb(254,188,46)]" />
              <div className="w-[13px] h-[13px] rounded-full bg-[rgb(45,200,66)]" />
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(paste.content);
                toast.success("Copied to Clipboard");
              }}
              className="flex items-center"
            >
              <Copy size={20} />
            </button>
          </div>

          <textarea
            value={paste.content}
            disabled
            className="w-full p-3 focus-visible:ring-0"
            rows={20}
            style={{ caretColor: "#000" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
