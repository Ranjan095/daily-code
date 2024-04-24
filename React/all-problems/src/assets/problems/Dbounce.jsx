import { useState } from "react";
import { useDbounce } from "../../utils/dbounce";

export const Dbounce = () => {
  let [data, setData] = useState([]);
  let dbounceFn = useDbounce(setData);

  let handleChange = (e) => {
    let { value } = e.target;
    dbounceFn(value, 800);
  };

  return (
    <div className=" ">
      <div className="flex justify-center mt-4">
        <input
          className=" border-2 border-slate-400 rounded-md w-96 h-10 block"
          onChange={handleChange}
        />
      </div>

      <div className=" grid grid-cols-4">
        {data.length > 0 &&
          data?.map((ele, i) => {
            return (
              <div
                key={i}
                className=" m-2 p-1 border border-x-2 hover:border-red-300"
              >
                <img src={ele.Poster} />
                <p>Title : {ele.Title}</p>
                <p>Year : {ele.Year}</p>
                <p>Type : {ele.Type}</p>
              </div>
            );
          })}
      </div>
      {data.length <= 0 && (
        <div>
          <h1 className=" text-3xl ">
            Data is not found search with <b>OMDB</b> Movie title exemple:{" "}
            <b>batman</b>,<b>flowers</b>,<b>Harry</b>{" "}
          </h1>
        </div>
      )}
    </div>
  );
};
