import React from "react";
import { Button } from "./Button";

export const ListItem = ({
  id,
  attributes: { name, alias_name },
  handleDelete,
  handleEdit,
}) => {
  return (
    <li>
      <div>
        <span>{name}</span>
        <p>{alias_name}</p>
      </div>
      <div>
        <Button
          type="primary"
          text="Edit"
          handleClick={() => handleEdit(id, name, alias_name)}
        />
        <Button
          type="danger"
          text="Delete"
          handleClick={() => handleDelete(id)}
        />
      </div>
    </li>
  );
};
