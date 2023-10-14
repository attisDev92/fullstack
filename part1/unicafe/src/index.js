import React, {useState} from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('container'));

const Button = ({ nameBtn, handlerClick}) => <button onClick={handlerClick}>{nameBtn}</button>;

const Display = ({ name, number }) => <p>{name} {number}</p>

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
      <Display name='good' number={clicks.good} />
      <Display name='neutral' number={clicks.neutral} />
      <Display name='bad' number={clicks.bad} />
      <Display name='Total' number={total}/>
      <Display name='Averege' number={promedio}/>
      <Display name='Positive' number={positiveValue}/>
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
