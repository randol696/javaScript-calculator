import React, { useState } from 'react';
import './App.css';
import { evaluate } from 'mathjs'

const App =() => {
  let [result, setResult] = useState('0');

  // Added a state to keep track of the last input type
  const [lastInputType, setLastInputType] = useState('number');

  const handleClick = (e) => {
    const { name } = e.target; 
    
    if (name === '.' || name === '0') {
      // If the current result ends with a decimal point or '0', ignore the click event
      if (result.endsWith('.') || (result.endsWith('0') && lastInputType === 'number')) {
        return;
      }
    }

    if (result === '0' && lastInputType === 'number') {
      // If the current result is '0' and last input type is number, replace it with the new input
      setResult(name);
    } else {
      // If the result is not '0' or the input is not '0', append the input
      setResult(prevResult => prevResult + name);
    }

    setLastInputType(name === '.' ? 'dot' : 'number');
  };

  const calculate = () => {
    try {
      const result = evaluate(result);
      if (!isNaN(result)) {
        setResult(result);
      } else {
        setResult('Invalid operation');
      }
    } catch (error) {
      setResult('Invalid operation');
    }
  };

  const clear = () => {
    setResult('0');
    setLastInputType('number');
  }

  return (
   <div className="calculator">
    <div id="display">{result}</div>
    <button id="clear" type="button" onClick={clear}>AC</button>
    <button id="divide" name="/" className="operations" onClick={handleClick}>/</button>
    <button id="multiply" name="*" className="operations" onClick={handleClick}>X</button>
    <button id="seven" name="7" onClick={handleClick}>7</button>
    <button id="eight" name="8" onClick={handleClick}>8</button>
    <button id="nine" name="9" onClick={handleClick}>9</button>
    <button id="subtract" name="-" className="operations" onClick={handleClick}>-</button>
    <button id="four" name="4" onClick={handleClick}>4</button>
    <button id="five" name="5" onClick={handleClick}>5</button>
    <button id="six" name="6" onClick={handleClick}>6</button>
    <button id="add" name="+" className="operations" onClick={handleClick}>+</button>
    <button id="one" name="1" onClick={handleClick}>1</button>
    <button id="two" name="2" onClick={handleClick}>2</button>
    <button id="three" name="3" onClick={handleClick}>3</button>
    <button id="equals" type="button" onClick={calculate}>=</button> 
    <button id="zero" name="0" onClick={handleClick}>0</button>
    <button id="decimal"name="." onClick={handleClick}>.</button>
   </div>
  );
}

export default App;
