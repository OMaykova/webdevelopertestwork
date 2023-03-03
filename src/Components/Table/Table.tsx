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
        <td className='order-item' >{OrderSide[item.side]}</td>
        <td className='order-item' >{item.price}</td>
        <td className='order-item' >{item.amount}</td>
        <td className='order-item' >{Instrument[item.instrument]}</td>
      </tr>
    )
    
  }
  return (
		<table>
      <thead>
        <tr>
          <td className='order-item'>Id</td>
          <td className='order-item'>Creation time</td>
          <td className='order-item'>Change time</td>
          <td className='order-item'>Status</td>
          <td className='order-item'>Side</td>
          <td className='order-item'>Price</td>
          <td className='order-item'>Amount</td>
          <td className='order-item'>Instrument</td>
        </tr>
      </thead>
      <tbody>
        {listOfOrders.map((el: any, index: any) => renderListItems(el, index))}
      </tbody>
    </table>
  )
}

export default Table;
