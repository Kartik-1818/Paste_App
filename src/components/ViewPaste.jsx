import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();

  // ✅ Fetch from localStorage instead of Redux
  const storedPastes = JSON.parse(localStorage.getItem("pastes")) || [];

  const paste = storedPastes.find(p => p._id === id);

  if (!paste) {
    return (
      <div className="w-full h-full flex items-center justify-center text-2xl font-bold">
        Paste Not Found 😢
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

        <div className="w-full flex flex-col items-start relative rounded border border-[rgba(128,121,121,0.3)]">
          <div className="w-full flex justify-between px-4 py-2 border-b">
            <div className="flex gap-x-[6px]">
              <div className="w-[13px] h-[13px] rounded-full bg-red-500" />
              <div className="w-[13px] h-[13px] rounded-full bg-yellow-400" />
              <div className="w-[13px] h-[13px] rounded-full bg-green-500" />
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(paste.content);
                toast.success("Copied to Clipboard ✅");
              }}
              className="flex items-center"
            >
              <Copy size={20} />
            </button>
          </div>

          <textarea
            value={paste.content}
            disabled
            className="w-full p-4 min-h-[300px] focus-visible:ring-0"
            style={{ caretColor: "#000" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
