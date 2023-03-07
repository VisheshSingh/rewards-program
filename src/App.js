import logo from './logo.svg';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [pointsByMonth, setPointsByMonth] = useState({});
  const [totalPoints, setTotalPoints] = useState(0);

  const fetchTransactions = async () => {
    const res = await fetch('http://localhost:4000/transactions');
    const data = await res.json();
    setTransactions(data);
    calculatePointsByMonthAndTotal(data);
  };

  // Determine points logic based on amount
  const calculatePoints = (transaction) => {
    let amountOverHundred = 0,
      amountOverFifty = 0,
      amountLeft = 0;
    let points = 0;
    // Amount > 100
    if (transaction.amount > 100) {
      amountOverHundred = transaction.amount - 100;
      amountLeft = transaction.amount - amountOverHundred;
      points += amountOverHundred * 2;
      if (amountLeft > 50) {
        amountOverFifty = amountLeft - 50;
        points += amountOverFifty;
      }
    } else {
      // Amount < 100 but > 50
      if (transaction.amount > 50) {
        amountOverFifty = transaction.amount - 50;
        points += amountOverFifty;
      }
    }
    return points;
  };

  const calculatePointsByMonthAndTotal = (transactions) => {
    const monthlyPointsMap = {};
    for (let i = 0; i < 12; i++) {
      monthlyPointsMap[i] = transactions
        .filter((transaction) => new Date(transaction.date).getMonth() === i)
        .map(calculatePoints)
        .reduce((acc, cur) => (acc += cur), 0);
    }
    setPointsByMonth(monthlyPointsMap);
    const total = Object.values(monthlyPointsMap).reduce(
      (acc, cur) => acc + cur,
      0
    );
    setTotalPoints(total);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
