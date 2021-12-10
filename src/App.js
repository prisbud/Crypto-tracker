import './App.css'
import React, {useEffect,useState} from 'react'
import axios from 'axios'
import Coin from './coin'


function App() {

  const [coins,setCoins] = useState([])
  const [search,setSearch] = useState('');

  useEffect(()=>{
    axios
    .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res => {
      setCoins(res.data)
      
    })
    .catch(err => console.log(err));    

  },[]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
    );
  return (
    <div className="coin-app">
     
      <body>
        <div className="coin-search">
          <div className="coin-search">
            <h1 className="coin-text">Search a coin</h1>
            <form>
              <input type="text" onChange={handleChange} placeHolder="Search.." className="coin-input" />
            </form>
          </div>
          {filteredCoins.map(coin =>{
            return (<div id={coin.id}>
                <Coin key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}/>
                
            </div>)
          })}
        </div>
      </body>
    </div>
  );
}

export default App;
