import './Ticker.css';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataSelector, addToList } from '../../store/dataSlice';
import { PlaceOrder } from '../../Models/ClientMessages'
import Decimal from 'decimal.js';
import { Instrument } from '../../Enums';

function Ticker() {
  const dispatch = useDispatch();
  const { data, listOfOrders } = useSelector(dataSelector);
  const [selectValue, setSelectValue] = useState<Instrument>(1);
  const [isInputAmount, setIsInputAmount] = useState<boolean>(true);
  const [amount, setAmount] = useState<number|''>('');
  const [scoreRUB, setScoreRUB] = useState<number>(50000)

  function handleChangeSelect(e: any) {
    e.preventDefault();
    setSelectValue(e.target.value)
  }
  
  function isValid(value: string) {
    return /^-?\d+$/.test(value);
  }

  function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if ((isValid(e.target.value) || e.target.value === "") && e.target.value.length < 8) {
      if (e.target.value === "") {
        setIsInputAmount(true)
      } else {
        setIsInputAmount(false)
      }
      setAmount(+e.target.value)
    }
  }

  function handleClickBtn(rate: Decimal, e: any, side: number) {
    e.preventDefault();
    let date: Date = new Date();
    let result = date.toLocaleString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    let dateOfCreate = `${result} ${date.getHours()}:${date.getMinutes()}`
    if (listOfOrders.length === 0) {
      let array = [];
      let order: PlaceOrder = {
        id: 1,
        creationTime: dateOfCreate,
        changeTime: dateOfCreate, //подтягивать с сервера в будущем
        status: 1,
        side: side,
        price: rate,
        amount: amount,
        instrument: selectValue,
      } 
      array.push(order)
      dispatch(addToList(array))
    } else {
      let array = Array.from(listOfOrders)
      let order: PlaceOrder = {
        id: listOfOrders.length + 1,
        creationTime: dateOfCreate,
        changeTime: dateOfCreate,
        status: 1,
        side: side,
        price: rate,
        amount: amount,
        instrument: selectValue,
      }
      array.push(order)
      dispatch(addToList(array))
    }
    setAmount('')
    setIsInputAmount(true)
    alert('Ваша заявка принята!')
  }

  return (
    <div className='ticker'>
      <form className='form'>
        <fieldset className='form__border'>
          <legend className='form__title'>Создание заявки</legend>
          <div className='form__inputs'>
            <select onChange={e => handleChangeSelect(e)} className='select'>
              <option value='1'>CNY/RUB</option>
              <option value='2'>EUR/RUB</option>
              <option value='3'>USD/RUB</option>
              <option value='4'>TRY/RUB</option>
              <option value='5'>BYN/RUB</option>
              <option value='6'>EUR/USD</option>
            </select>
            <input className='amount' placeholder="Объем заявки" value={amount} onChange={e => handleChangeInput(e)} />
          </div>
          <div className='rates'>
            <div className='rates__cell'>
              <p className='rate'>{amount ? data && data.rateSell[Instrument[selectValue]] : 0}</p>
              {isInputAmount || amount === 0 ? 
                <button
                  disabled
                  className='ticker-button ticker-button_sell ticker-button_disabled'>
                  SELL
                </button>
              : 
                <button
                  onClick={(e) => handleClickBtn(data.rateSell[Instrument[selectValue]], e, 2)}
                  className='ticker-button ticker-button_sell'>
                  SELL
                </button>
              }
            </div>
            <div className='rates__cell'>
              <p className='rate'>{amount ? data && data.rateBuy[Instrument[selectValue]] : 0}</p>
              {isInputAmount || amount === 0 ? 
                <button
                  disabled
                  className=' ticker-button ticker-button_buy ticker-button_disabled'>
                  BUY
                </button>
              : 
                <button
                  onClick={(e) => handleClickBtn(data.rateBuy[Instrument[selectValue]], e, 1)}
                  className='ticker-button ticker-button_buy'>
                  BUY
                </button>
              }
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  )
}

export default Ticker;
