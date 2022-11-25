import React, { useEffect, useState } from "react";
import { Endpoints } from "../config/Endpoints";
import { HttpClient } from "../services/HttpClient";

export const Form = ({ loadList, setSpinner, selectedOrg, setSelectedOrg }) => {
  const [name, setName] = useState("");
  const [aliasName, setAliasName] = useState("");

  useEffect(() => {
    if (selectedOrg.id) {
      setName(selectedOrg.name);
      setAliasName(selectedOrg.aliasName);
    }
  }, [selectedOrg]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else {
      setAliasName(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedOrg.id) {
      // editar
      var params = JSON.stringify({
        data: {
          id: selectedOrg.id,
          type: "organizations",
          attributes: {
            name: name,
            alias_name: aliasName,
            organization_type_id: 2,
            subcategory_id: 92,
          },
        },
      });

      const url =
        Endpoints.BASE_URL +
        Endpoints.DEL_PUT_ORGANIZATION.replace(":id", selectedOrg.id);
      HttpClient.customFetch(
        "PUT",
        url,
        params,
        handleSuccess,
        handleError,
        handleAlways
      );
    } else {
      // crear
      setSpinner(true);
      var formData = new FormData();
      formData.append("data[type]", "organizations");
      formData.append("data[attributes][name]", name);
      formData.append("data[attributes][alias_name]", aliasName);
      formData.append("data[attributes][organization_type_id]", "2");
      formData.append("data[attributes][subcategory_id]", "286");
      const url = Endpoints.BASE_URL + Endpoints.POST_ORGANIZATION;

      HttpClient.customFetch(
        "POST",
        url,
        formData,
        handleSuccess,
        handleError,
        handleAlways
      );
    }
  };

  const handleSuccess = (response) => {
    if (response) {
      if (selectedOrg.id) {
        setSelectedOrg({
          id: "",
          name: "",
          aliasName: "",
        });
        setName("");
        setAliasName("");
      }
      loadList();
    }
  };

  const handleError = (error) => {
    console.log(error);
  };

  const handleAlways = () => {
    setSpinner(false);
  };

  return (
    <section id="form-create">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="alias_name"
          id="alias_name"
          placeholder="Alias name"
          value={aliasName}
          onChange={handleChange}
        />
        <input
          type="submit"
          name="create"
          value={selectedOrg.id ? "Edit" : "Create"}
        />
      </form>
    </section>
  );
};
