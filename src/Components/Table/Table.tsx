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
  function tableToCSV() {
    let arr: any = [];
    listOfOrders.forEach((element: { [s: string]: unknown; } | ArrayLike<unknown>) => {
      arr.push(Object.values(element))
    })
    arr.map((i:any) => {
      i[3]= OrderStatus[i[3]]
      i[4]= OrderSide[i[4]]
      i[7]= Instrument[i[7]]
    })
    let arr2: any[] =['Id,Creation time,Change time,Status,Side,Price,Amount,Instrument']
    arr.map((e: { toString: () => any; }) => {
      arr2.push(e.toString())
    })
    let csv_data: string
    
    csv_data = arr2.join('\n');
    
    downloadCSVFile(csv_data);

}
  function downloadCSVFile(csv_data:any) {

    let CSVFile = new Blob([csv_data], { type: "text/csv" });
    let temp_link = document.createElement('a');
    temp_link.download = "orders.csv";
    let url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;
    temp_link.style.display = "none";
    document.body.appendChild(temp_link);
    temp_link.click();
    document.body.removeChild(temp_link);
  }
      
  return (
    <>
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
      {listOfOrders.length > 0 ? 
        <button className='table-btnCSV' onClick={() => tableToCSV()}>
          Выгрузка таблицы в .csv
        </button>
        : 
        <button
          disabled
          className='table-btnCSV table-btnCSV_disabled'>
          Выгрузка таблицы в .csv
        </button>
      }
    </>
  )
}

export default Table;
