import { ethers } from 'ethers';
import Web3 from 'web3'


function filter() {

    filterMempool.watch(function (error, txHash) {
        if (error) {
            console.log('pending filter error: ' + error);
            console.log("Reinitialising filter");
            filterMempool.stopWatching();
            filterMempool.once({
                fromBlock: currentBlock,
                toBlock: 'pending'
            }, function(error, data) {
                // DO your stuff you want to do
                // Restart filter
                filter();
            });
        } else {
            const currentTx = web3.eth.getTransaction(txHash);
            currentBlock = currentTx.blockNumber;
            doSomething(currentTx);

        }
    });
}


let privateKey = "df57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e";
let wallet = new ethers.Wallet(privateKey);

console.log(wallet.address)

// Connect a wallet to mainnet
const url = "wss://bsc.getblock.io/testnet/?api_key=5af906a2-6cfe-42e9-9abe-62eb49fe890d"
const customWsProvider = new ethers.providers.WebSocketProvider(url);
var web3 = new Web3(new Web3.providers.WebsocketProvider(url));

var currentBlock;
var filterMempool = web3.eth.filter('pending');