import './Table.css';
import { useSelector } from "react-redux";
import { dataSelector } from "../../store/dataSlice";
import { Instrument } from '../../Enums';
import { OrderStatus } from '../../Enums';
import { OrderSide } from '../../Enums';

function Table() {
  const { listOfOrders } = useSelector(dataSelector);
  function renderListItems(item: any, index: any) {
    return (
      <tr key={index}>
        <td className='order-item' >{item.id}</td>
        <td className='order-item'>{item.creationTime}</td>
        <td className='order-item' >{item.changeTime}</td>
        <td className='order-item' >{OrderStatus[item.status]}</td>
        <td className={item.side===1 ? 'order-item order-item_buy' : 'order-item order-item_sell'} >{OrderSide[item.side]}</td>
        <td className={item.side===1 ? 'order-item order-item_buy' : 'order-item order-item_sell'} >{item.price}</td>
        <td className={item.side===1 ? 'order-item order-item_buy' : 'order-item order-item_sell'} >{item.amount}</td>
        <td className='order-item' >{Instrument[item.instrument]}</td>
      </tr>
    )
    
  }
  return (
		<table className='table'>
      <thead className='table-title'>
        <tr className='title'>
          <th className='order-item'>Id</th>
          <th className='order-item'>Creation time</th>
          <th className='order-item'>Change time</th>
          <th className='order-item'>Status</th>
          <th className='order-item'>Side</th>
          <th className='order-item'>Price</th>
          <th className='order-item'>Amount</th>
          <th className='order-item'>Instrument</th>
        </tr>
      </thead>
      <tbody>
        {listOfOrders.map((el: any, index: any) => renderListItems(el, index))}
      </tbody>
    </table>
  )
}

export default Table;
