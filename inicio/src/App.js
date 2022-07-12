import './App.css';
import { useState } from 'react';


const WarningNotUsed = () => {
  return <h1>Contador not used Yet</h1>
};

const ListOfClicks = ({ clicks }) => {
  return clicks.join(", ");
};

let INICIAL_COUNTER_STATE = {};

if (localStorage.getItem('counters')) {
  let casa = localStorage.getItem('counters');
  console.log(casa);
  INICIAL_COUNTER_STATE = {
    left: Number(casa),
    right: 0,
    //clicks: 0,
    mensaje: "Menssage using a objetc"
  };
}
else {
  INICIAL_COUNTER_STATE = {
    left: 0,
    right: 0,
    //clicks: 0,
    mensaje: "Menssage using a objetc"
  };
}





function App() {

  const [counters, setCounters] = useState(INICIAL_COUNTER_STATE);

  const [clicks, setClicks] = useState([]);

  const handleClickLeft = (event) => {
    console.log(event);
    event.preventDefault();
    const newCounterState = {
      ...counters,  //Trae las propiedades anteriores y se sobreescriben solo las siguientes
      left: counters.left + 1,    //Nunca hacer conters.left ++ , podria dar malos resultados
      //clicks: counters.clicks + 1
    }
    setCounters(newCounterState);
    setClicks(prevClicks => {
      return [...prevClicks, "L"];
    });
    localStorage.setItem('counters', counters.left);
  };

  const handleClickResetStorage = () => {
    localStorage.clear();
  };

  const handleClickRight = () => {

    setCounters({
      ...counters,
      right: counters.right + 1,
      //clicks: counters.clicks + 1
    });
    setClicks(prevClicks => ([...prevClicks, "R"]));
  };

  const handleClickReset = () => {
    // const newCounterState = {
    //   ...counters,
    //   left: 0,
    //   right: 0,
    //   clicks: 0
    // }

    setCounters(INICIAL_COUNTER_STATE);
    setClicks([]);
  }

  return (
    <div className="App">
      <h1>React Course</h1>
      <p>
        <strong>{counters.left}</strong>
        <button onClick={handleClickLeft}>Left</button>
        <button onClick={handleClickRight}>Right</button>
        <strong>{counters.right}</strong>
      </p>

      <p><button onClick={handleClickReset}>Reset All</button></p>
      <p><button onClick={handleClickResetStorage}>Reset localStorage</button></p>
      <p>Clicks Made : {clicks.length}</p>
      <p style={{ height: "30px" }}> {clicks.length === 0 ? <WarningNotUsed /> : <ListOfClicks clicks={clicks} />}</p>

      <p>{counters.mensaje}</p>
    </div >
  );
}

export default App;
