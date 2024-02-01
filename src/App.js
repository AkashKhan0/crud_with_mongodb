import { Icon } from "@iconify/react";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Formdata } from "./components/Formdata";

axios.defaults.baseURL = "http://localhost:8080";

function App() {
  const [popup, setPopup] = useState(false);
  const [edit, setEdit] = useState(false);
  const [datalist, setDatalist] = useState([]);
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formdataEdit, setFormdataEdit] = useState({
    name: "",
    email: "",
    message: "",
    id: "",
  });

  const handleOnCahnge = (e) => {
    const { value, name } = e.target;
    setFormdata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handlSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post("/create", formdata);
    if (data.data.success) {
      setPopup(false);
      alert(data.data.message);
      getFetchData();
      setFormdata({
        name: "",
        email: "",
        message: "",
      });
    }
  };
  const getFetchData = async () => {
    const data = await axios.get("/");
    console.log(data);
    if (data.data.message) {
      setDatalist(data.data.data);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);
  console.log(datalist);

  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id);
    if (data.data.message) {
      getFetchData();
      alert(data.data.message);
    }
  };

  const handlUpdate = async (e) => {
    e.preventDefault();
    const data = await axios.put("/update/", formdataEdit);
    if (data.data.message) {
      getFetchData();
      alert(data.data.message);
      setEdit(false);
    }
  };
  const handleEditOnCahnge = async (e) => {
    const { value, name } = e.target;
    setFormdataEdit((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleEdit = (el) => {
    setFormdataEdit(el);
    setEdit(true);
  };
  return (
    <div className="full_con">
      {popup && (
        <Formdata
          handlSubmit={handlSubmit}
          handleOnCahnge={handleOnCahnge}
          handleClose={() => setPopup(false)}
          rest={formdata}
        />
      )}

      {edit && (
        <Formdata
          handlSubmit={handlUpdate}
          handleOnCahnge={handleEditOnCahnge}
          handleClose={() => setEdit(false)}
          rest={formdataEdit}
        />
      )}

      <div className="container">
        <div className="addBtn">
          <h1>Add Your Data</h1>
          <button onClick={() => setPopup(true)}>ADD</button>
        </div>
        <div className="alldataBox">
          <div className="title">
            <div className="tname">Name</div>
            <div className="tname">Email</div>
            <div className="tname">Message</div>
            <div className="tname">Delete/Edit</div>
          </div>

          {datalist[0] ? (
            datalist.map((el) => {
              return (
                <div className="title" key={el._id}>
                  <div className="dname">{el.name}</div>
                  <div className="dname">{el.email}</div>
                  <div className="dname">{el.message}</div>
                  <div className="dname edit-delete">
                    <span className="edit" onClick={() => handleEdit(el)}>
                      <Icon icon="uil:edit" className="display" />
                    </span>
                    <span
                      className="delete"
                      onClick={() => handleDelete(el._id)}
                    >
                      <Icon icon="tdesign:delete" className="display" />
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <p
              style={{
                textAlign: "center",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              No Data Available 😔
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
