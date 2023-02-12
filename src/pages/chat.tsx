import io from "socket.io-client";
import { useState, useEffect } from "react";
import { useMyProfile } from "../utils/context/myProfileContext";
import { useRouter } from "next/router";

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
  GiftSwap,
}

export default function Home() {
  const myProfile = useMyProfile();

  const router = useRouter();

  const [level, setLevel] = useState(0);
  const [partnerRequest, setPartnerRequest] = useState(false);
  const [message, setMessage] = useState("");

  const [pName, setName] = useState("██████ ████████████");
  const [pAge, setAge] = useState("██");
  const [pBirthday, setBirthday] = useState("██/██/██");
  const [pGender, setGender] = useState("█████");
  const [pSexuality, setSexuality] = useState("████████");
  const [pBirthplace, setBirthplace] = useState("███████████");
  const [pAddress, setAddress] = useState("██████████████████████████████");
  const [pProfession, setProfession] = useState("██████████");
  const [pWorkplace, setWorkplace] = useState("██████████");
  const [pPhone, setPhone] = useState("███-███-████");
  const [pEmail, setEmail] = useState("████████████@█████.███");
  const [pLon, setLon] = useState('███.█████"█');
  const [pLat, setLat] = useState('███.█████"█');
  const [pIceCream, setIceCream] = useState("████████ ████ ██████");
  const [pPoliticalAlignment, setPoliticalAlignment] = useState("████████████");
  const [pFamily, setFamily] = useState("██████████ ████████ ███ ███████ ██ ███████");
  const [pPets, setPets] = useState("█████████ ████ █████████");
  const [pIPAddress, setIPAddress] = useState("███.███.██.██");
  const [pSocialSecurity, setSocialSecurity] = useState("███-██-████");
  const [pMothersMaidenName, setMothersMaidenName] = useState("███████");
  const [pStreetGrewUpOn, setStreetGrewUpOn] = useState("████████████");
  const [pCreditCardNumber, setCreditCardNumber] = useState("█ █████ ██████ ████");
  const [pCreditCardExpirationDate, setCreditCardExpirationDate] = useState("██/██");
  const [pCreditCardCVC, setCreditCardCVC] = useState("███");
  
  const [messages, setMessages] = useState<Array<Message>>([]);

  useEffect(() => {
    socketInitializer();
  }, []);

  useEffect(() => {
    if (!myProfile.id || !myProfile.name || !myProfile.email) {
      router.push("/");
    }
  }, [myProfile]);

  const socketInitializer = async () => {
    // We just call it because we don't need anything else out of it
    await fetch("/api/socket");

    socket = io();

    socket.on("newIncomingMessage", (msg: Message) => {
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
          alert("You have been alerted");
          break;
        }
        case ActionType.Sound: {
          console.log("LOUD SOUND");
          break;
        }
        case ActionType.Dox: {
          console.log("get doxxed bro");
          break;
        }
        case ActionType.GiftSwap: {
          console.log("items have been purchased using your account");
          break;
        }
      }
    });

    socket.on("newLevelUpRequest", (data) => {
      console.log("recieved level up request");
      setPartnerRequest(true);
    });

    socket.on("newLevelUpConfirm", (data) => {
      console.log("recieved confirmation of level up");
      setLevel((oldLevel) => oldLevel + 1);
      setPartnerRequest(false);
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
  };

  const requestLevelUp = async () => {
    console.log("requesting level up");

    if (partnerRequest) {
      setLevel(level + 1);
      setPartnerRequest(false);
      socket.emit("createdLevelUpConfirm", {});
    } else {
      socket.emit("createdLevelUpRequest", {});
    }
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      if (message) {
        sendMessage();
      }
    }
  };

  const actionButtons = [
    {text: "Send Alert", at: ActionType.Popup, threshold: 1},
    {text: "Sound Alarm", at: ActionType.Sound, threshold: 2},
    {text: "Dox Partner", at: ActionType.Dox, threshold: 3},
    {text: "Purchase Gift", at: ActionType.GiftSwap, threshold: 4},
  ];

  return (
    <div className="flex items-center mx-auto min-h-screen justify-center bg-green-500">
      <main className="w-full gap-4 flex flex-col items-center justify-center h-full">
          <div className="w-full flex items-center mx-auto min-h-screen justify-center">
            
            <div className="w-1/2 h-screen bg-black text-green-500 p-2 font-mono overflow-auto">
              <p className=" text-xl">Profile Info</p>
              {/* add a photograph area here too */}
              <p>Your Partner's name is {pName}.</p> 
              <p>They are {pAge} years old, and were born on {pBirthday}.</p>
              <p>Their gender is {pGender} and sexuality is {pSexuality}.</p>
              <p>They currently live at the address {pAddress}.</p>
              <p>They are a {pProfession} at {pWorkplace}.</p>
              <p>Their phone number is {pPhone}.</p>
              <p>Their email address is {pEmail}.</p>
              <p>Longitude: {pLon}. Latitude: {pLat}.</p>
              <p>Their favorite ice cream flavor is {pIceCream}.</p>
              <p>Their political alignment is {pPoliticalAlignment}</p>
              <p>Family: {pFamily}.</p>
              <p>Pets: {pPets}.</p>
              <p>Their IP address is {pIPAddress}.</p>
              <p>Their social security number is {pSocialSecurity}.</p>
              <p>Their Mother's maiden name is {pMothersMaidenName}</p>
              <p>They are from {pBirthplace} and the name of the street that they grew up on is {pStreetGrewUpOn}.</p>
              <p>Their credit card number is {pCreditCardNumber}, the expiration date is {pCreditCardExpirationDate}, and the three numbers on the back are {pCreditCardCVC}.</p>

            </div>

          <div className="w-1/2 h-screen bg-purple-500">
            <>
              <p className="font-bold text-white text-xl">
                Your name: {myProfile.name}
              </p>
              <div className="flex flex-col justify-end bg-white h-[30rem] min-w-[33%] rounded-md shadow-md ">
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
              <p className="font-bold text-white text-xl">Level: {level}</p>
            </>
          </div>

          <div
            className="w-1/2 h-screen 
                              bg-cover bg-center bg-[url('https://i.ibb.co/L5xXrzj/istockphoto-486407276-612x612-transformed-1.jpg')]
                              justify-center"
          >
            {/* Button */}
            <button
              className="pushable"
              onClick={() => {
                requestLevelUp();
              }}
            >
              <span className="front">TAKE IT TO THE NEXT LEVEL</span>
            </button>

            {actionButtons.map((b, i) => {
              return (
                <button
                  onClick={() => {
                    console.log("sending action: " + b.text);
                    sendAction(b.at);
                  }}>
                  {b.text}
                </button>
              );
            })}

            
          </div>
        </div>
      </main>
    </div>
  );
}
