import { useEffect, useState } from "react";
import { Form } from "./components/Form";
import { List } from "./components/List";
import { Navbar } from "./components/Navbar";
import { Spinner } from "./components/Spinner";
import { Endpoints } from "./config/Endpoints";
import { HttpClient } from "./services/HttpClient";
import "./assets/styles/App.css";
import "./assets/styles/Buttons.css";

function App() {
  const [data, setData] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState({
    id: "",
    name: "",
    aliasName: "",
  });
  console.log(data);

  useEffect(() => {
    loadList();
  }, []);

  const loadList = () => {
    setSpinner(true);
    HttpClient.customFetch(
      "GET",
      Endpoints.BASE_URL + Endpoints.GET_ORGANIZATION,
      null,
      handleSuccess,
      handleError,
      handleAlways
    );
  };

  const handleSuccess = (response) => {
    if (response) {
      setData(response.data.slice(0, 10));
    }
  };

  const handleError = (error) => {
    console.log(error);
  };
  const handleAlways = () => {
    setSpinner(false);
  };

  const handleEdit = (id, name, aliasName) => {
    setSelectedOrg({
      id,
      name,
      aliasName,
    });
  };
  return (
    <div className="App">
      <Navbar />
      <Spinner spinner={spinner} />
      <Form
        selectedOrg={selectedOrg}
        setSpinner={setSpinner}
        loadList={loadList}
        setSelectedOrg={setSelectedOrg}
      />
      <List
        list={data}
        setSpinner={setSpinner}
        loadList={loadList}
        handleEdit={handleEdit}
      />
    </div>
  );
}

export default App;
