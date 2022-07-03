import React, { createContext, useContext, useEffect, useState } from "react";

const AccountContext = createContext({});
export const useAccount = () => {
  return useContext(AccountContext);
};
export type iContext = {
  sid?: string | null;
  updateSid?: (sid: string) => void;
};
type Props = {
  children: React.ReactNode;
};
export const AccountProvider = ({ children }: Props) => {
  const [sid, setSid] = useState<string | null>(
    localStorage.getItem("sid") || ""
  );
  const [questions, setQuestions] = useState([]);

  const updateSid = (newSid: string) => {
    localStorage.setItem("sid", newSid);
    setSid(newSid);
  };
  useEffect(() => {}, []);
  const values: iContext = { sid, updateSid };

  return (
    <AccountContext.Provider value={values}>{children}</AccountContext.Provider>
  );
};
