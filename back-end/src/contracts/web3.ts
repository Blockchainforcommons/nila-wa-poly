import Web3 from 'web3';
// import { Promise } from 'bluebird';
import HDWalletProvider from '@truffle/hdwallet-provider';
import WareHouseAbi from './build/warehouseTree.abi.json';
import dotenv from 'dotenv';
dotenv.config();
const mnemonic: any = process.env.EXECUTOR_PRIVATE_KEY;
const rpcUrl: any = process.env.RPC_URL;
const ABI = WareHouseAbi.abi;

const provider: any = new HDWalletProvider(mnemonic, rpcUrl);
const web3 = new Web3(provider);

export namespace WareHouseContract {
  let contract: any,
    isReady: boolean = false;
  export const setup = async () => {
    try {
      contract = new web3.eth.Contract(ABI, process.env.WAREHOUSE_ADDRESS);
      //   Promise.promisifyAll(contract, { suffix: 'Promise' });
      isReady = true;
      return isReady;
    } catch (error) {
      return false;
    }
  };

  export const getBalance = async () => {
    try {
      const address = await web3.eth.getAccounts();
      const balance = await web3.eth.getBalance(address[0]);
      return balance;
    } catch (error) {}
  };

  // export const
}
