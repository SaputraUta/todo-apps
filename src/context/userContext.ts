import React from "react";

interface User {
  id: string;
  username: string;
  email: string;
}

const defaultUser: User = {
  id: "",
  username: "",
  email: "",
};

const UserContext = React.createContext<User>(defaultUser);

export default UserContext;
