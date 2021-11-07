import { ethers } from 'ethers';
import web3 from 'web3'
let privateKey = "df57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e";
let wallet = new ethers.Wallet(privateKey);

console.log(wallet.address)

// Connect a wallet to mainnet
const url = "wss://bsc.getblock.io/testnet/?api_key=5af906a2-6cfe-42e9-9abe-62eb49fe890d"
const customWsProvider = new ethers.providers.WebSocketProvider(url);

//console.log(customWsProvider.getBlock("pending").transactions.length);
let transferFilter = {
    address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    topics: [
        // the name of the event, parnetheses containing the data type of each event, no spaces
        ethers.utils.id("Transfer(address,address,uint256)")
    ]
}
customWsProvider.on(transferFilter, (event) => {
    // A new block was created
    console.log(event)
});

/*
customWsProvider.on("pending", (tx) => {
    customWsProvider.getTransaction(tx).then(function (transaction) {
      console.log(transaction);
    });
});
*/

