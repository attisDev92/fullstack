import React, {useState} from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('container'));

const Button = ({ nameBtn, handlerClick}) => <button onClick={handlerClick}>{nameBtn}</button>;

const Display = ({ name, number }) => <p>{name} {number}</p>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handlerClickGood = () => {
    setGood(good + 1);
  };

  const handlerClickNeutra = () => {
    setNeutral(neutral + 1);
  };

  const handlerClickBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <div>
        <h1>Give feedback</h1>
        <Button nameBtn='good' handlerClick={handlerClickGood} />
        <Button nameBtn='neutral' handlerClick={handlerClickNeutra} />
        <Button nameBtn='bad' handlerClick={handlerClickBad} />
      </div>
      <div>
        <h2>Statiscs</h2>
        <Display name='good' number={good} />
        <Display name='neutral' number={neutral} />
        <Display name='bad' number={bad} />
      </div>
    </div>
  )
}

root.render(<App />);
