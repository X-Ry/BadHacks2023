import React, { useContext, useState, useEffect } from "react";
import { nanoid } from "nanoid";

interface MyProfileContextType {
  id: string | undefined;
  name: string | undefined;
  email: string | undefined;
  enterInfo: (name: string, email: string) => void;
}

const myProfileContext = React.createContext<MyProfileContextType | null>(null);

export function useMyProfile() {
  return useContext(myProfileContext) as MyProfileContextType;
}

export function MyProfileProvider(props: { children: React.ReactNode }) {
  const [id, setId] = useState<MyProfileContextType["id"]>();
  const [name, setName] = useState<MyProfileContextType["name"]>();
  const [email, setEmail] = useState<MyProfileContextType["email"]>();

  function enterInfo(name: string, email: string) {
    setId(nanoid());
    setName(name);
    setEmail(email);
  }

  const value = {
    id,
    name,
    email,

    enterInfo,
  };

  return (
    <myProfileContext.Provider value={value}>
      {props.children}
    </myProfileContext.Provider>
  );
}
