import Web3, { Uint256 } from 'web3';
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
    } catch (error) {
      return 0;
    }
  };

  export const getDepth = async () => {
    try {
      const depth = await contract.methods.depth().call();
      return depth;
    } catch (error) {
      console.error(error);
      return 0;
    }
  };

  export const getRoot = async () => {
    try {
      const root = await contract.methods.root().call();
      return root;
    } catch (error) {
      console.error(error);
      return '0x00';
    }
  };

  export const getSize = async () => {
    try {
      const size = await contract.methods.size().call();
      return size;
    } catch (error) {
      console.error(error);
      return 0;
    }
  };

  export const verifyData = async (data: any, path: any, index: Uint256) => {
    try {
      const result = await contract.methods.verifyData(data, path, index).call();
      return result;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  export const addLeaf = async (data: any, newItem: any, path: any, index: Uint256) => {
    try {
      const address = await web3.eth.getAccounts();

      const result = await contract.methods.addLeaf(data, newItem, path, index).send({ from: address[0] });
      return result;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  export const updateLeaf = async (data: any, path: any, index: Uint256) => {
    try {
      const address = await web3.eth.getAccounts();

      const result = await contract.methods.updateLeaf(data, path, index).send({ from: address[0] });
      return result;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
}
