/** @format */

import axios from "axios";
import React, { useState } from "react";

let obj = {
  name: "",
  age: "",
};

const Cloudinary = () => {
  let [userData, setUserData] = React.useState(obj);
  let [imageFile, setImageFile] = useState();

  let handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(userData);
    {
      /*** start upload image to cloudinary  ***/
    }
    if (imageFile) {
      {
        /*** it will not work ***/
      }
      //   let formData = {
      //     file: imageFile,
      //     upload_preset: "durgauli",
      //     cloud_name: "ranjanyadav",
      //   };
      {
        /*** it will work ***/
      }

      let formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "durgauli");
      formData.append("cloud_name", "ranjanyadav");

      await axios
        .post(
          "https://api.cloudinary.com/v1_1/ranjanyadav/image/upload",
          formData
        )
        .then((res) => {
          let obj = { ...userData, image: res.data.url };
          console.log(obj);
        });
    } else {
      console.log("No imageFile");
      console.log(userData);
    }
    {
      /*** End upload image to cloudinary  ***/
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className=" space-y-2">
        <div>
          <label htmlFor="name">Name : </label>
          <input
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            type="text"
            id="name"
            className="border border-black rounded"
          />
        </div>
        <div>
          <label htmlFor="age">Age : </label>
          <input
            value={userData.age}
            onChange={(e) => setUserData({ ...userData, age: e.target.value })}
            type="number"
            id="age"
            className="border border-black rounded"
          />
        </div>
        <div>
          <label htmlFor="image">Image : </label>
          <input
            onChange={(e) => setImageFile(e.target.files[0])}
            type="file"
            id="image"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-2 py-1 border border-black rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Cloudinary;
