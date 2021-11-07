import { ethers } from 'ethers';
import Web3 from 'web3'
let privateKey = "2695b1526413ad089424b8fd67873d2cd067ef310011cf3632b6316530e83265";
let wallet = new ethers.Wallet(privateKey);

console.log(wallet.address)

// Connect a wallet to mainnet
const url = "wss://bsc.getblock.io/testnet/?api_key=5af906a2-6cfe-42e9-9abe-62eb49fe890d"
const customWsProvider = new ethers.providers.WebSocketProvider(url);
var web3 = new Web3(new Web3.providers.WebsocketProvider(url));

let txs ;
let test;
var trxDetail = new String();

var subscription = web3.eth.subscribe('newBlockHeaders', function(error, result){
    if (!error) {
        const blockNum = result.number;
        web3.eth.getBlock(blockNum, true).then((data) => {
            data.transactions.forEach( function(e) {
                console.log("  tx hash          : " + e.gas)
            })
        //console.log(block)
        })
        /*
        if(trxDetail == "0x327af4d7109Bb0e378758e54FE416e46AFC3Fa53"){
            console.log("hello life")
        }
        */

        return;
    }

    console.error(error);
})
.on("data", function(blockHeader){
    console.log(blockHeader);
})
.on("error", console.error);

// unsubscribes the subscription
subscription.unsubscribe(function(error, success){
    if (success) {
        console.log('Successfully unsubscribed!');
    }
});

/*
test = await web3.eth.getBlock("latest").then((data) => { txs = data.transactions})

console.log(txs)
txs.forEach(async function(transaction, index){
    await web3.eth.getTransaction(transaction).then((data) => {
        console.log(data.to+ "index"+ index)
        trxDetail = data.to 
    })
    if(trxDetail == "0x327af4d7109Bb0e378758e54FE416e46AFC3Fa53"){
        console.log("hello life")
    }
});
*/