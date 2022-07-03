import React from "react";
import UserItem from "./UserItem";

export default function UsersList({ users }: any) {
  return (
    <>
      {users.map((user: any, index: number) => (
        <UserItem key={index} user={user} />
      ))}
    </>
  );
}
