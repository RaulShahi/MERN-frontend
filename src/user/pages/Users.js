import React from "react";
import { User } from "../../model/userModal";
import UsersList from "../components/UsersList";

function Users() {
  const USERS = [
    new User(
      "u1",
      "John Cena",
      "https://www.wwe.com/f/styles/wwe_large/public/all/2019/10/RAW_06202016rf_1606--3d3997f53e6f3e9277cd5a67fbd8f31f.jpg",
      3
    ),
  ];

  return <UsersList items={USERS} />;
}

export default Users;
