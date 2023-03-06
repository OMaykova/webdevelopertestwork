import './Ticker.css';
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataSelector, addToList } from '../../store/dataSlice';
import { PlaceOrder } from '../../Models/ClientMessages'
import { Instrument } from '../../Enums';

function Ticker() {
  const dispatch = useDispatch();
  const { data, listOfOrders } = useSelector(dataSelector);
  const [selectValue, setSelectValue] = useState<Instrument>(1);
  const [isInputAmount, setIsInputAmount] = useState<boolean>(true);
  const [amount, setAmount] = useState<number|''>('');
  const [currentBid, setCurrentBid] = useState(0.00);
  const [currentOffer, setCurrentOffer] = useState(0.00);
  const inputRefBid = useRef<HTMLInputElement>(null);
  const inputRefOffer = useRef<HTMLInputElement>(null);
  const [isBidValid, setIsBidValid] = useState<boolean>(false)
  const [isOfferValid, setIsOfferValid] = useState<boolean>(false)
  const [bidError, setBidError] = useState<string>('')
  const [offerError, setOfferError] = useState<string>('')

  useEffect(()=>{setCurrentBid(data.bid[Instrument[selectValue]])},[data.bid, selectValue])
  useEffect(()=>{setCurrentOffer(data.offer[Instrument[selectValue]])},[data.offer, selectValue])

  function handleChangeSelect(e: any) {
    setSelectValue(e.target.value)
  }
  
  function isValid(value: string) {
    return /^\d+$/.test(value);
  }

  function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>) {

    if ((isValid(e.target.value) || e.target.value === "") && e.target.value.length < 8) {
      if (e.target.value === "") {
        setIsInputAmount(true)
      } else {
        setIsInputAmount(false)
      }
      setAmount(+e.target.value)
      // setCurrentBid(data.bid[Instrument[selectValue]])
    }
  }
  function handleChangeBid(e: React.ChangeEvent<HTMLInputElement>) {
    const {value} = e.target;
    const validValue = /^(\b([0-9]|[1-9][0-9]|[1-4][0-9][0-9]|500)\b(.\d{1,2}))$/.test(value)
    setIsBidValid(validValue)
    if (!validValue) {
      setBidError('Ввод в формате от 0.00 до 500.00. В противном случае - заявка будет оформлена по текущему price')
    } else {
      setBidError('')
      setCurrentBid(+e.target.value)
    }
  }
  function handleChangeOffer(e: React.ChangeEvent<HTMLInputElement>) {
    const {value} = e.target;
    const validValue = /^(\b([0-9]|[1-9][0-9]|[1-4][0-9][0-9]|500)\b(.\d{1,2}))$/.test(value)
    setIsOfferValid(validValue)
    if (!validValue) {
      setOfferError('Ввод в формате от 0.00 до 500.00. В противном случае - заявка будет оформлена по текущему price')
    } else {
      setOfferError('')
      setCurrentOffer(+e.target.value)
    }
  }
  function handleClickBtn(rate: number, e: any, side: number) {
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
        changeTime: dateOfCreate, 
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
    setCurrentBid(0.00)
    setCurrentOffer(0.00)
    setBidError('')
    setOfferError('')
    if(inputRefBid && inputRefBid.current) {
    inputRefBid.current.value = '';}
    if(inputRefOffer && inputRefOffer.current) {
      inputRefOffer.current.value = '';}
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
            <input type='number' className='amount' onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault()}} placeholder="Объем заявки" value={amount} onChange={e => handleChangeInput(e)} />
          </div>
          <div className='rates'>
            <div className='rates__cell'>
              <p className='rate'>{amount ? data && data.bid[Instrument[selectValue]] : 0}</p>
              <input className='current-rate__cell' onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault()}} onChange={e =>handleChangeBid(e)} ref={inputRefBid} type='number' step="0.01" min="0" max='500' placeholder='Укажите свою цену' title="This should be a number with up to 2 decimal places." />
              <span className='error'>{bidError}</span>
              {isInputAmount || amount === 0 ? 
                <button
                  disabled
                  className='ticker-button ticker-button_sell ticker-button_disabled'>
                  SELL
                </button>
              : 
                <button
                  onClick={(e) => handleClickBtn(currentBid && currentBid!==0? currentBid : data.bid[Instrument[selectValue]], e, 2)}
                  className='ticker-button ticker-button_sell'>
                  SELL
                </button>
              }
            </div>
            <div className='rates__cell'>
              <p className='rate'>{amount ? data && data.offer[Instrument[selectValue]] : 0}</p>
              <input className='current-rate__cell' onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault()}} onChange={e =>handleChangeOffer(e)} ref={inputRefOffer} type='number' step="0.01" min="0" max='500' placeholder='Укажите свою цену' title="This should be a number with up to 2 decimal places." />
              <span className='error'>{offerError}</span>
              {isInputAmount || amount === 0 ? 
                <button
                  disabled
                  className=' ticker-button ticker-button_buy ticker-button_disabled'>
                  BUY
                </button>
              : 
                <button
                  onClick={(e) => handleClickBtn(currentOffer && currentOffer!==0? currentOffer : data.offer[Instrument[selectValue]], e, 1)}
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
