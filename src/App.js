import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as XLSX from "xlsx";

function App() {
  const [heading ,setHeading] =  useState([])
  const [items, setItems] = useState([]);
  console.log(items);
   useEffect(() => {
    if (items.length !== 0) {
      setHeading(Object.keys(items[0]))
    }
   }, [items])
  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setItems(d);
    });
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          console.log(file);
          readExcel(file);
        }}
      />
      {items.length !== 0 ? (
        <table class="table container">
          <thead>
            <tr>
              {
                heading.map(h =>(
                  <th scope="col">{h}</th>
                  ))
              }
            </tr>
          </thead>
          <tbody>
            {items.map((d, idx) => (
            <tr key={idx}>
              {
                heading.map(h =>{
                  console.log(h)
                  // console.log(JSON.parse(h))
                  // console.log(d.${h})
               return  <td>{d[h]}</td>
                })
              }
            </tr>
          ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
}

export default App;
