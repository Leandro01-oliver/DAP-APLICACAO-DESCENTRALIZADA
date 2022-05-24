const express = require('express');
const { type } = require('express/lib/response');
const app = express();
const Web3 = require('web3');
const web3KeyMain = new Web3("https://mainnet.infura.io/v3/6c5c509ef65e481c93d9c81485f289be");
const web3KeyRedeRopsten = new Web3("https://ropsten.infura.io/v3/6c5c509ef65e481c93d9c81485f289be");
const web3KeyRedeRinkeby = new Web3('https://rinkeby.infura.io/v3/6c5c509ef65e481c93d9c81485f289be');
let keys = [web3KeyMain, web3KeyRedeRopsten, web3KeyRedeRinkeby];


app.get('/getbalancemain',  (req, res) => {
    console.log(keys[0])
    keys[0].eth.net.getNetworkType().then(async (result) => {
        if (result === 'main') {
            let walletAndress = req.query.walletAndress;
            let balance = await keys[0].eth.getBalance(walletAndress);
            let balanceEth = keys[0].utils.fromWei(balance, 'ether');
            res.send({ balanceEth, result });
        }
    });
});

app.get('/getbalanceropsten',  (req, res) => {
    keys[1].eth.net.getNetworkType().then(async (result) => {
        if (result === 'ropsten') {
            let walletAndress = req.query.walletAndress;
            let balance = await keys[1].eth.getBalance(walletAndress);
            let balanceEth = keys[1].utils.fromWei(balance, 'ether');
            res.send({ balanceEth, result });
        }
    });
});

app.get('/getbalancerinkeby',  (req, res) => {
    keys[2].eth.net.getNetworkType().then(async (result) => {
        if (result === 'rinkeby') {
            let walletAndress = req.query.walletAndress;
            let balance = await keys[2].eth.getBalance(walletAndress);
            let balanceEth = keys[2].utils.fromWei(balance, 'ether');
            res.send({ balanceEth, result });
        }
    });

});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});