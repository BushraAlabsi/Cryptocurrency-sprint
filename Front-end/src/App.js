import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import token from './token';

class App extends Component {
  state = {
    owner: '',
    players:[],
    balance: '',
    value: '',
    message: '',
    address: 0,
    addressFrom: 0,
    txnSender: 0,
    currentaddress:'',
    accounts:[]
  };
 async componentDidMount() {
    
    const accounts = await web3.eth.getAccounts();
    const owner =  accounts[0];
    this.setState({ owner , accounts});
  }

  getTokens = async event => {
    event.preventDefault();
    
    this.setState({ message: 'Waiting on transaction success...' });
    await token.methods.getTokens().send({
      from: this.state.accounts[this.state.txnSender],
      value: web3.utils.toWei(this.state.value, 'ether')
    });
    this.setState({ message: 'You got your tokens!' });
  };
  tokenBalance = async event => { 
    event.preventDefault();
    
  
    this.setState({ message: 'Waiting on transaction success...' });
    let result = await token.methods.balances(this.state.accounts[this.state.address]).call({
      from: this.state.accounts[this.state.txnSender]
    });
console.log(result)
    this.setState({ message: result });
  };
  transfer = async event => {
    event.preventDefault();
    
    this.setState({ message: 'Waiting on transaction success...' });
     await token.methods.transfer(this.state.accounts[this.state.address],this.state.value).send({
      from: this.state.accounts[this.state.txnSender]
    });
// console.log(result)
    this.setState({ message: "transaction has been entered" });
  };
  transferFrom = async event => {
    event.preventDefault();
    
    this.setState({ message: 'Waiting on transaction success...' });
     await token.methods.transferFrom(this.state.accounts[this.state.addressFrom], this.state.accounts[this.state.address],this.state.value).send({
      from: this.state.accounts[this.state.txnSender]
    });
// console.log(result)
    this.setState({ message: "transaction has been entered" });
  };
  approve = async event => {
    event.preventDefault();
    
    this.setState({ message: 'Waiting on transaction success...' });
     await token.methods.approve(this.state.accounts[this.state.address],this.state.value).send({
      from: this.state.accounts[this.state.txnSender]
    });
// console.log(result)
    this.setState({ message: "transaction has been entered" });
  };
  getEthers= async event => {
   event.preventDefault();
   
   this.setState({ message: 'Waiting on transaction success...' });
   await token.methods.getEthers(this.state.value).send({
     from: this.state.accounts[this.state.txnSender]
   });
   this.setState({ message: 'You sold your tokens!' });
  };

  render() {
    return (
     <div>
        <h2>My Currency</h2>
        <p>
          This token is owned by {this.state.owner}. There are currently{' '}
          {this.state.players.length} tokens left, competing to win{' '}
          {web3.utils.fromWei(this.state.balance, 'ether')} ether!
        </p>
        <hr /> 
         <div>
      
          <h2>specify the transaction sender</h2>
      <input
             
              onChange={event => this.setState({ txnSender: event.target.value })}
            />
            <hr />
            </div>
          <h4>Current address</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
        <hr />
        <form onSubmit={this.getTokens}>
          <h4>Buy Tokens</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>getTokens</button>
        </form>
        <hr />
         <form onSubmit={this.tokenBalance}>
          <h4>View your balance of Tokens</h4>
          <div>
            <label>Enter the address</label>
            <input
              address={this.state.address}
              onChange={event => this.setState({ address: event.target.value })}
            />
          </div>
          <button>Get balance!</button>
        </form>
        <hr />
        <h1>{this.state.message}</h1>
        <hr />
         <form onSubmit={this.transfer}>
          <h4>Transfer token to an address</h4>
          <div>
            <label>Enter the address to transfer to</label>
            <input
              address={this.state.address}
              onChange={event => this.setState({ address: event.target.value })}
            />
            <br /><br />
            <label>Enter the token to transfer</label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Transfer tokens!</button>
        </form>
        <hr />
         <form onSubmit={this.transferFrom}>
          <h4>Transfer token to an address to another</h4>
          <div>
            <label>Enter the address to transfer from</label>
            <input
              addressFrom={this.state.addressFrom}
              onChange={event => this.setState({ addressFrom: event.target.value })}
            />
            <br /><br />
            <label>Enter the address to transfer to</label>
            <input
              address={this.state.address}
              onChange={event => this.setState({ address: event.target.value })}
            />
            <br /><br />
            <label>Enter the token to transfer</label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Transfer tokens!</button>
        </form>
        <hr />
        <form onSubmit={this.approve}>
          <h4>give permission to an account to spend some ether</h4>
          <div>
            <label>Enter the address of the spender</label>
            <input
              address={this.state.address}
              onChange={event => this.setState({ address: event.target.value })}
            />
            <br /><br />
            <label>Enter the allowance value</label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Set allowance!</button>
        </form>
        <hr />
        <form getEthers={this.getEthers}>
         <h4>Sell Tokens</h4>
         <div>
           <label>Amount of tokens to sell</label>
           <input
             value={this.state.value}
             onChange={event => this.setState({ value: event.target.value })}
           />
         </div>
         <button>sell Tokens</button>
       </form>
       <hr />
      </div>
    );
  }
}
export default App