import React, { useState, useEffect, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as XLSX from "xlsx";
import EmailEditor from "react-email-editor";

function App() {
  const [heading, setHeading] = useState([]);
  const [items, setItems] = useState([]);
  console.log(items);
  useEffect(() => {
    if (items.length !== 0) {
      setHeading(Object.keys(items[0]));
    }
  }, [items]);
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
  const emailEditorRef = useRef(null);

  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      console.log("exportHtml", html);
      console.log(design);
    });
  };

  const onLoad = () => {
    // editor instance is created
    // you can load your template here;
    // const templateJson = {};
    // emailEditorRef.current.editor.loadDesign(templateJson);
  };

  const onReady = () => {
    // editor is ready
    console.log("onReady");
  };
  return (
    <div>
      <div>
        <button onClick={exportHtml}>Export HTML</button>
      </div>
      <div className="parentgg">
        {/* <div className="removgg">Developed by gg</div> */}
        <EmailEditor style={{ height: "calc(100vh - 50px)" }} ref={emailEditorRef} onLoad={onLoad} onReady={onReady} />
      </div>
    </div>
  );
}

export default App;
