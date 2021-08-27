import React, { useState } from 'react';
import './App.css';
import { CoinBlocks } from '@cryptotest/widgets'
const slugs: string[] = ['ethereum', 'bitcoin', 'koala-token', 'cardano', 'venus-xrp','binance-coin', 'usd-coin']

function App() {
  const [inputSlugs, setInputSlug] = useState<string>('ethereum,bitcoin,koala-token,cardano,venus-xrp,binance-coin,usd-coin')
  const [displaySlugs, setDisplaySlugs] = useState<string[]>([])
  const search = () => {
    if (inputSlugs) {
      setDisplaySlugs(inputSlugs?.split(','))
    }
  }
  return (
    <div className="App" style={{padding: 20}}>
      <div>
        <label>
        please input the slug names, separate with comma:
        for example: {slugs.join(',')}
        </label>
        <div style={{margin: 20}}>
          <input type="text" value={inputSlugs} 
            onChange={(ev) => setInputSlug(ev.target.value)} style={{width: "500px"}}/>
          <button type="submit" onClick={search} style={{marginLeft: '200px'}}>Search</button>
        </div>
       
      </div>
      <p style={{textAlign: 'left',fontWeight: 'bold'}}>CoinBlock</p>
      <div style={{width: '80vw', margin: 'auto', border: '1px solid #c8b9b9', padding: '10px', overflow: 'auto'}}>
        <CoinBlocks slugs={displaySlugs} />
      </div>
    </div>
  );
}

export default App;
