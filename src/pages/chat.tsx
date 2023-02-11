import io from "socket.io-client";
import { useState, useEffect } from "react";
import { useMyProfile } from "../utils/context/myProfileContext";

let socket;

type Message = {
  authorId: string;
  authorName: string;
  message: string;
};

type Action = {
  type: ActionType;
  data: string;
};

enum ActionType {
  Popup,
  Sound,
  Dox,
  GiftSwap
};

export default function Home() {
  const myProfile = useMyProfile();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<Message>>([]);

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    // We just call it because we don't need anything else out of it
    await fetch("/api/socket");

    socket = io();

    socket.on("newIncomingMessage", (msg) => {
      setMessages((currentMsg) => [
        ...currentMsg,
        {
          authorId: msg.authorId,
          authorName: msg.authorName,
          message: msg.message,
        },
      ]);
    });

    socket.on("newIncomingAction", (act: Action) => {
      console.log("recieved action");
      switch (act.type) {
        case ActionType.Popup: {
          alert("what's up");
          break;
        } case ActionType.Sound: {

          break;
        } case ActionType.Dox: {
          
          break;
        } case ActionType.GiftSwap: {
          
          break;
        }
      }
    });
  };

  const sendMessage = async () => {
    const data = {
      authorId: myProfile.id,
      authorName: myProfile.name,
      message,
    };
    socket.emit("createdMessage", data);
    setMessages((currentMsg) => [...currentMsg, data]);
    setMessage("");
  };

  const sendAction = async (at: ActionType) => {
    socket.emit("createdAction", { type: at, data: "data" });
    console.log("sending action");
  }

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      if (message) {
        sendMessage();
      }
    }
  };

  return (
    <div className="flex items-center mx-auto min-h-screen justify-center bg-green-500">
      <main className="w-full gap-4 flex flex-col items-center justify-center h-full">
          <div className="w-full flex items-center mx-auto min-h-screen justify-center">
            
            <div className="w-1/2 h-screen bg-gray-500 p-2 hover:bg-gradient-to-r">
              <p className="w-1/2 h-full font-bold text-white text-xl">Profile Info</p>
            </div>

            <div className="w-1/2 h-screen bg-purple-500">
              <>
                <p className="font-bold text-white text-xl">
                  Your name: {myProfile.name}
                </p>
                <div className="flex flex-col justify-end bg-white h-[20rem] min-w-[33%] rounded-md shadow-md ">
                  <div className="h-full last:border-b-0 overflow-y-scroll">
                    {messages.map((msg, i) => {
                      return (
                        <div
                          className="w-full py-1 px-2 border-b border-gray-200"
                          key={i}
                        >
                          {msg.authorName} : {msg.message}
                        </div>
                      );
                    })}
                  </div>
                  <div className="border-t border-gray-300 w-full flex rounded-bl-md">
                    <input
                      type="text"
                      placeholder="New message..."
                      value={message}
                      className="outline-none py-2 px-2 rounded-bl-md flex-1"
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyUp={handleKeypress}
                    />
                    <div className="border-l border-gray-300 flex justify-center items-center  rounded-br-md group hover:bg-purple-500 transition-all">
                      <button
                        className="group-hover:text-white px-3 h-full"
                        onClick={() => {
                          sendMessage();
                        }}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </>
            </div>

            <div className="w-1/2 h-screen 
                              bg-cover bg-center bg-[url('https://i.ibb.co/L5xXrzj/istockphoto-486407276-612x612-transformed-1.jpg')]
                              justify-center">
                <p className="font-bold text-center text-black text-xl">TAKE IT TO THE NEXT LEVEL</p>
                
            </div>
          </div>
      </main>
    </div>
  );
}
