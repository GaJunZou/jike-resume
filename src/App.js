import "./App.scss";
import "../node_modules/quill/dist/quill.snow.css";
import React from "react";
import ResumePage from "./page/resume-page";
class App extends React.Component {
  render() {
    return (
      <div className="app-box">
        <ResumePage></ResumePage>
      </div>
    );
  }
}
export default App;
