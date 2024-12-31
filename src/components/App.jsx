import { useState } from "react";
import BackgroundImage from "./BackgroundImage";
import Time from "./Time";
import Weather from "./Weather";
import Welcome from "./Welcome";
import Mantra from "./Mantra";
import ForecastDaily from "./ForecastDaily";

function App() {
  let [changeUserName, setChangeUserName] = useState(
    localStorage.getItem("user-name") === null ? false : true
  );

  if (changeUserName === false) {
    return (
      <div>
        <BackgroundImage />
        <Welcome setChangeUserName={setChangeUserName} />
      </div>
    );
  }

  return (
    <>
      <BackgroundImage />
      <Time />
      <Weather />
      <ForecastDaily />
      <Mantra />
    </>
  );
}

export default App;
