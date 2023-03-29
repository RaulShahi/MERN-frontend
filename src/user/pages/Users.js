import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../services/users";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttp } from "../../shared/hooks/http-hook";
import UsersList from "../components/UsersList";

function Users() {
  const { isLoading, error, clearError, sendRequest } = useHttp();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await sendRequest(getAllUsers);
        setUsers(response?.data?.users);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <UsersList items={users} />
    </>
  );
}

export default Users;
