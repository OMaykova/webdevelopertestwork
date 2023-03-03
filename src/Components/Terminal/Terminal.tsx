import Ticker from '../Ticker/Ticker';
import './Terminal.css';
import Table from '../Table/Table';

function Terminal() {
  return (
    <div className="terminal">
      <Ticker></Ticker>
      <Table></Table>
    </div>
  );
}

export default Terminal;
