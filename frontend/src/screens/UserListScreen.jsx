import React, { useEffect, useState } from "react";
import UsersTable from "../components/usersTable";
import axios from "axios";

const usersListScreen = () => {
  const [user, setUsers] = useState([]);
  const getUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/users-list",
        { withCredentials: true }
      );
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      <h1>USERS</h1>
      <UsersTable users={user} />
    </div>
  );
};

export default usersListScreen;
