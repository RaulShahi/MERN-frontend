import React, { useEffect, useState } from "react";
import { User } from "../../model/userModal";
import { getAllUsers } from "../../services/users";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttp } from "../../shared/hooks/http-hook";
import UsersList from "../components/UsersList";

function Users() {
  const { isLoading, error, clearError, data } = useHttp(getAllUsers);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <UsersList items={data?.data?.users} />
    </>
  );
}

export default Users;
