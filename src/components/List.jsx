import React from "react";
import { Endpoints } from "../config/Endpoints";
import { HttpClient } from "../services/HttpClient";
import { ListItem } from "./ListItem";

export const List = ({ list, setSpinner, handleEdit }) => {
  const handleDelete = (id) => {
    setSpinner(true);
    const url =
      Endpoints.BASE_URL + Endpoints.DEL_PUT_ORGANIZATION.replace(":id", id);
    HttpClient.customFetch(
      "DELETE",
      url,
      null,
      handleSuccess,
      handleError,
      handleAlways
    );
  };

  const handleSuccess = (response) => {
    if (response) loadList();
  };

  const handleError = (error) => {
    console.log(error);
  };
  const handleAlways = () => {
    // setSpinner(false);
  };

  return (
    <section className="container">
      <h1>Organization List</h1>
      <ul id="organization">
        {list.map(({ id, attributes }) => (
          <ListItem
            key={id}
            id={id}
            attributes={attributes}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </ul>
    </section>
  );
};
