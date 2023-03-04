import Ticker from '../Ticker/Ticker';
import './Terminal.css';
import Table from '../Table/Table';

function Terminal() {
  return (
    <div className="terminal">
      <Ticker />
      <Table />
    </div>
  );
}

export default Terminal;
