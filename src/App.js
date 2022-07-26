import { useEffect, useState } from 'react';
import axios from'axios';
import './App.css';

function App() {

  const [options, setOptions] = useState([{value: 1, label: 'USD'}, {value: 1, label: 'EUR'}, {value: 1, label: 'UAH'}])   
  const [selectedCur1, setSelectedCur1] = useState(1)
  const [selectedCur2, setSelectedCur2] = useState(1)
  const [value, setValue] = useState(0)
  const [value2, setValue2] = useState(0)

  //get currency 
  useEffect( () => {
    axios.get('https://api.monobank.ua/bank/currency')
    .then( response =>  setOptions([{value: response.data[0].rateBuy, label: 'USD'}, {value: response.data[1].rateBuy, label: 'EUR'}, {value: 1, label: 'UAH'}]))
    .catch( e => console.log(e) )
  }, [])

  //calc 
  let change1 = (value) => {
    setValue(value)
    setValue2((Number(value) / Number(selectedCur2) * Number(selectedCur1)).toFixed(2))
  }
  let change2 = (value) => {
    setValue2(value)
    setValue((Number(value) / Number(selectedCur1) * Number(selectedCur2)).toFixed(2))
  }

  return (
    <div className="container">
      <h1>КУРС ВАЛЮТ</h1>
      
      <h2>{options.map((e, idx) => {
        if(idx<2){
          return <div key={idx}>1 {e.label} = {e.value} UAH</div>
        } })}
      </h2>
      
      <div className='first'>
        <input type="number" value={value} onChange={e => change1(e.target.value)}/> 
        <select onChange={e => setSelectedCur1(e.target.value)}>
          <option selected value={0}>Выберите валюту</option>
            {options.map(e => {
              return <option key={e.label} value={e.value}>{e.label}</option>
            })}
        </select> 
      </div>
      <br/>
      <div className='second'>
        <input type="number" value={value2} onChange={e => change2(e.target.value)}/> 
        <select onChange={e => setSelectedCur2(e.target.value)}>
          <option selected value={0}>Выберите валюту</option>
            {options.map(e => {
              return <option key={e.label} value={e.value}>{e.label}</option>
            })}
        </select>
      </div>
    </div>
  );
}

export default App;
