import React, {useState} from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('container'));

const Button = ({ nameBtn, handlerClick}) => <button onClick={handlerClick}>{nameBtn}</button>;

const Rows = ({ name, number }) => {
  return (
    <tr>
      <td>{name}</td> 
      <td>{number}</td>
    </tr>
  )
};

const Statiscs = ({ clicks }) => {
  
  let total = clicks.good + clicks.neutral + clicks.bad;
  let promedio = total === 0 ? 0 : (clicks.good - clicks.bad) / total;
  let positiveValue = total === 0 ? '0%' : `${(clicks.good * 100) / total}%`;

  if (total === 0) {
    return <div>No feedback given</div>
  };

  return (
    <div>
      <h2>Statiscs</h2>
      <table>
        <Rows name='good' number={clicks.good} />
        <Rows name='neutral' number={clicks.neutral} />
        <Rows name='bad' number={clicks.bad} />
        <Rows name='Total' number={total}/>
        <Rows name='Averege' number={promedio}/>
        <Rows name='Positive' number={positiveValue}/>
      </table>
    </div>
  )
}

const App = () => {

  const [clicks, setClicks] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  });

  const handlerClickGood = () => {
    const newClicks = {
      ...clicks,
      good: clicks.good + 1
    }
    setClicks(newClicks);
  };

  const handlerClickNeutral = () => {
    const newClicks = {
      ...clicks,
      neutral: clicks.neutral + 1
    }
    setClicks(newClicks);
  };

  const handlerClickBad = () => {
    const newClicks = {
      ...clicks,
      bad: clicks.bad + 1
    }
    setClicks(newClicks);
  };

  return (
    <div>
      <div>
        <h1>Give feedback</h1>
        <Button nameBtn='good' handlerClick={handlerClickGood} />
        <Button nameBtn='neutral' handlerClick={handlerClickNeutral} />
        <Button nameBtn='bad' handlerClick={handlerClickBad} />
      </div>
      <div>
        <Statiscs clicks={clicks} />
      </div>
    </div>
  )
}

root.render(<App />);
