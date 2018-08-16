import web3 from './web3';
import sth from '../EthToken/compile';

const deployedContract = async function(){
	const accounts = await web3.eth.getAccounts();
	await new web3.eth.Contract(JSON.parse(sth.interface))
    .deploy({
      data: sth.bytecode,
      arguments: [100000000000000000000, 'BCCoin', 0, 'BCC' , 100]
    })
    .send({ from: accounts[0], gas: '1000000' });
};
const address = deployedContract.options.address;

const abi = sth.interface;
export default new web3.eth.Contract(abi, address);