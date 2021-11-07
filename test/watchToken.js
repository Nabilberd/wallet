import { ethers } from 'ethers';
import Web3 from 'web3'

let privateKey = "df57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e";
let wallet = new ethers.Wallet(privateKey);

console.log(wallet.address)

// Connect a wallet to mainnet
const url = "wss://bsc.getblock.io/testnet/?api_key=5af906a2-6cfe-42e9-9abe-62eb49fe890d"
const customWsProvider = new ethers.providers.WebSocketProvider(url);
var web3 = new Web3(new Web3.providers.WebsocketProvider(url));

function watchEtherTransfers() {
    // Instantiate web3 with WebSocket provider
    const web3 = new Web3(new Web3.providers.WebsocketProvider(url))
  
    web3.eth.getPendingTransactions().then((data) =>console.log("test"+ data));

    // Instantiate subscription object
    const subscription = web3.eth.subscribe('pendingTransactions')
  
    // Subscribe to pending transactions
    subscription.subscribe((error, result) => {
      if (error) console.log(error)
    })
    .on('data', async (txHash) => {
      try {
        // Instantiate web3 with HttpProvider
        const web3Http = new Web3('https://bsc.getblock.io/?api_key=5af906a2-6cfe-42e9-9abe-62eb49fe890d')
  
        // Get transaction details
        const trx = await web3Http.eth.getTransaction(txHash).then((data) =>console.log(data));
      
        //const valid = validateTransaction(trx)
        // If transaction is not valid, simply return
        //if (!valid) return
  
        console.log('Found incoming Ether transaction from ' + process.env.WALLET_FROM + ' to ' + process.env.WALLET_TO);
        console.log('Transaction is: ' + trx)
        console.log('Transaction hash is: ' + txHash + '\n')
  
        // Initiate transaction confirmation
        //confirmEtherTransaction(txHash)
  
        // Unsubscribe from pending transactions.
        subscription.unsubscribe()
      }
      catch (error) {
        console.log(error)
      }
    })
  }

  watchEtherTransfers()