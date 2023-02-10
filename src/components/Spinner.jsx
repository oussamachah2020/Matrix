import { Spin } from "antd";
import "../sass/layout/Spinner.scss";

function Spinner() {
  return (
    <div className="spinner-container">
      <Spin />
    </div>
  );
}

export default Spinner;
