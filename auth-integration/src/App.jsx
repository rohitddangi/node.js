import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = await axios.post(
      "http://localhost:3000/api/users/register",
      formData
    );

    if (res) {
      console.log(res);
    }

    console.log(formData);
    setFormData({
      name: "",
      email: "",
      mobile: "",
      password: "",
    });
  };

  return (
    <div>
      <h1>User registration</h1>
      <form onSubmit={handleSubmit} action="">
        <input
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          type="text"
          placeholder="name"
        />
        <input
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          type="email"
          placeholder="email"
        />
        <input
          value={formData.mobile}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, mobile: e.target.value }))
          }
          type="number"
          placeholder="mobile"
        />
        <input
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
          type="password"
          placeholder="password"
        />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default App;
