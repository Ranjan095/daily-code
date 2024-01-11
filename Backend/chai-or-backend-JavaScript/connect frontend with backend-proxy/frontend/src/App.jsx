/** @format */

import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  let [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`api/users`)
      .then((res) => {
        setUsers(res?.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div id="app-container">
        <h1>Let's connect backend with frontend </h1>
      </div>

      <div id="user-container">
        {users?.map((user) => (
          <div key={user.id}>
            <h2>Name : {user?.name}</h2>
            <p>
              Email : <b>{user?.email}</b>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
