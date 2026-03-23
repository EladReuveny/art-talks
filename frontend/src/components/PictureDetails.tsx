import { CircleX, LogIn, MessageCircle, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { picturesQueries } from "../features/pictures/pictures.queries";

const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:3000");

type PictureDetailsProps = {};

const PictureDetails = ({}: PictureDetailsProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    {
      id: string;
      user: { id: string; username: string };
      message: string;
      createdAt: Date;
    }[]
  >([]);
  const [user, setUser] = useState<{ id: string; username: string } | null>(
    null,
  );
  const [isCurrentUserSendingMessage, setIsCurrentUserSendingMessage] =
    useState(false);

  const authDialogRef = useRef<HTMLDialogElement>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const { pictureId } = useParams();

  const {
    data: picture,
    isLoading,
    error,
  } = picturesQueries.useFindOne(pictureId!);

  useEffect(() => {
    const closeDialog = (e: MouseEvent) => {
      if (authDialogRef.current?.open && e.target === authDialogRef.current) {
        authDialogRef.current.close();
      }
    };

    document.addEventListener("click", closeDialog);

    return () => {
      document.removeEventListener("click", closeDialog);
    };
  }, []);

  useEffect(() => {
    socket.emit("join-room", { room: pictureId });

    socket.on(
      "receive-message",
      (payload: {
        id: string;
        user: { id: string; username: string };
        message: string;
        createdAt: Date;
      }) => {
        setMessages((prev) => [...prev, payload]);
      },
    );

    return () => {
      socket.off("receive-message");
    };
  }, [pictureId]);

  useEffect(() => {
    if (isCurrentUserSendingMessage) {
      scrollRef.current?.scrollIntoView({
        behavior: "smooth",
      });
      setIsCurrentUserSendingMessage(false);
    }
  }, [messages]);

  const handleLoginSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;

    setUser({ id: crypto.randomUUID(), username });
    authDialogRef.current?.close();
  };

  const handleSendMessageSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message.trim()) return;

    setIsCurrentUserSendingMessage(true);

    socket.emit("send-message", {
      room: pictureId,
      user,
      message,
    });

    setMessage("");
  };

  if (isLoading) return <div className="">Loading...</div>;

  if (error) {
    console.error(error);
    toast.error(error.message);
  }

  return (
    <section className="px-2">
      <div className="flex gap-2">
        <h2 className="font-extrabold text-6xl tracking-tighter">
          {picture?.title}
        </h2>
        <span className="self-end text-slate-400 text-xl italic">
          By {picture?.artistName}
        </span>
      </div>

      <div className="mt-4 flex gap-8 h-[600px]">
        <img
          src={picture?.imgUrl}
          alt={picture?.title}
          className="w-full h-full object-cover rounded-3xl shadow-2xl"
        />

        <div className="flex flex-col justify-between min-w-[30%] rounded-3xl border border-slate-200 shadow-sm">
          <div className="bg-slate-50 border-b p-4 flex items-center justify-between">
            <h3 className="font-bold text-xl flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-indigo-600" />
              Live Discussion
            </h3>
            <span className="h-4 w-4 rounded-full bg-green-500 animate-[pulse_3s_ease-in-out_infinite]" />
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30">
            {messages?.length === 0 ? (
              <p className="text-center text-slate-400 mt-4">
                No messages yet. Start the conversation.
              </p>
            ) : (
              messages?.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col gap-1 py-2 px-4 rounded-2xl shadow-md
                      ${
                        msg.user.id === user?.id
                          ? "items-end bg-indigo-600 text-white rounded-tr-none shadow-indigo-600/80"
                          : "items-start bg-white border border-slate-100 rounded-tl-none"
                      }`}
                >
                  <span className="font-bold tracking-wide">
                    {msg.user.id === user?.id ? "You" : msg.user.username}
                  </span>
                  <p className="text-lg">{msg.message}</p>
                  <span
                    className={`text-sm text-slate-400 ${msg.user.id === user?.id ? "self-start" : "self-end"}`}
                  >
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))
            )}

            <div ref={scrollRef} />
          </div>

          <div className="p-4 bg-white border-t">
            {user ? (
              <form
                onSubmit={handleSendMessageSubmit}
                className="flex items-center gap-2 bg-slate-100 rounded-2xl p-2 border-2 border-transparent focus-within:border-indigo-600"
              >
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 outline-none caret-indigo-600"
                />
                <button
                  type="submit"
                  className="p-2 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700"
                >
                  <Send size={28} />
                </button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => authDialogRef.current?.showModal()}
                className="w-full py-3 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-indigo-700"
              >
                <LogIn size={28} /> Join the Chat
              </button>
            )}
          </div>
        </div>
      </div>

      <dialog
        ref={authDialogRef}
        className="fixed top-1/2 left-1/2 -translate-1/2 backdrop:backdrop-blur-md rounded-xl shadow-2xl p-4 w-1/2"
      >
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-black tracking-tight">Join Live Chat</h2>
          <button
            onClick={() => authDialogRef.current?.close()}
            className="text-slate-400 hover:text-slate-600"
          >
            <CircleX size={28} />
          </button>
        </div>

        <form onSubmit={(e) => handleLoginSubmit(e)}>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="username"
              className="text-xs font-bold text-slate-500 uppercase"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="w-full px-4 py-3 bg-slate-100 rounded-xl outline-none caret-indigo-600 border-2 border-transparent focus:border-indigo-500"
              placeholder="Type your username..."
            />
          </div>
          <button
            type="submit"
            className="mt-3 w-full py-3 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-indigo-700"
          >
            <LogIn size={28} /> Join
          </button>
        </form>
      </dialog>
    </section>
  );
};

export default PictureDetails;
