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
  const [isInputAmount, setIsInputAmount] = useState(true);
  const [amount, setAmount] = useState<number|''>('');

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

  function handleClickBtn(rate: Decimal) {
    let date: Date = new Date();
    let dateOfCreate = `${date.getFullYear()}.${date.getMonth()}.${date.getDay()}`

    if (listOfOrders.length === 0) {
      let order: PlaceOrder = {
        id: 0,
        creationTime: dateOfCreate,
        changeTime: dateOfCreate,
        status: 1,
        side: 1,
        price: rate,
        amount: amount,
        instrument: selectValue,
      }
      dispatch(addToList(order))
    } else {
      let order: PlaceOrder = {
        id: listOfOrders.length,
        creationTime: dateOfCreate,
        changeTime: dateOfCreate,
        status: 1,
        side: 1,
        price: rate,
        amount: amount,
        instrument: selectValue,
      }
      dispatch(addToList(order))
    }
    alert('Ваша заявка принята!')
    setAmount('')
  }

  return (
    <div className='ticker'>
      <form>
        <fieldset>
          <legend>Создание заявки</legend>
          <div>
            <select onChange={e => handleChangeSelect(e)}
            className='select'>
              <option value='1'>CHN/RUB</option>
              <option value='2'>EUR/RUB</option>
              <option value='3'>USD/RUB</option>
              <option value='4'>TRY/RUB</option>
              <option value='5'>BYN/RUB</option>
              <option value='6'>USD/EUR</option>
            </select>
            <input placeholder="Объем заявки" value={amount} onChange={e => handleChangeInput(e)}
            className='amount' />
          </div>
          <div>
            <div>
              <p>{data && data.rateSell[Instrument[selectValue]] * Number(amount)}</p>
              {isInputAmount ? 
                <button
                  disabled
                  className='button__sell button__sell_disabled'>
                  SELL
                </button>
              : 
                <button
                  onClick={() => handleClickBtn(data.rateSell[Instrument[selectValue]])}
                  className='button__sell'>
                  SELL
                </button>
              }
            </div>
            <div>
              <p>{data && data.rateBuy[Instrument[selectValue]] * Number(amount)}</p>
              {isInputAmount ? 
                <button
                  disabled
                  className='button__buy button__buy_disabled'>
                  SELL
                </button>
              : 
                <button
                  onClick={() => handleClickBtn(data.rateBuy[Instrument[selectValue]])}
                  className='button__buy'>
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
