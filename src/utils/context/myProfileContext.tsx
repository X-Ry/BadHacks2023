import React, { useContext, useState, useEffect } from "react";
import { nanoid } from "nanoid";

interface MyProfileContextType {
  id: string | undefined;
  name: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
  enterInfo: (name: string, email: string, phoneNumber: string) => void;
}

const myProfileContext = React.createContext<MyProfileContextType | null>(null);

export function useMyProfile() {
  return useContext(myProfileContext) as MyProfileContextType;
}

export function MyProfileProvider(props: { children: React.ReactNode }) {
  const [id, setId] = useState<MyProfileContextType["id"]>();
  const [name, setName] = useState<MyProfileContextType["name"]>();
  const [email, setEmail] = useState<MyProfileContextType["email"]>();
  const [phoneNumber, setPhoneNumber] =
    useState<MyProfileContextType["phoneNumber"]>();

  function enterInfo(name: string, email: string, phoneNumber: string) {
    setId(nanoid());
    setName(name);
    setEmail(email);
    setPhoneNumber(phoneNumber);
  }

  const value = {
    id,
    name,
    email,
    phoneNumber,
    enterInfo,
  };

  return (
    <myProfileContext.Provider value={value}>
      {props.children}
    </myProfileContext.Provider>
  );
}
