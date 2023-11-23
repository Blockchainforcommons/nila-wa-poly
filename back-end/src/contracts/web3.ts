import Web3 from 'web3';
import { Promise as BluePromise } from 'bluebird';
import HDWalletProvider from '@truffle/hdwallet-provider';
import WareHouseAbi from './build/warehouseTree.abi.json';
import dotenv from 'dotenv';
dotenv.config();
const mnemonic: any = process.env.EXECUTOR_PRIVATE_KEY;
const rpcUrl: any = process.env.RPC_URL;
const ABI: any = WareHouseAbi.abi;

const provider: any = new HDWalletProvider(mnemonic, rpcUrl);
const web3 = new Web3(provider);

export namespace WareHouseContract {
  let contract: any,
    isReady: boolean = false;
  export const setup = async () => {
    try {
      contract = new web3.eth.Contract(ABI, process.env.WAREHOUSE_ADDRESS);
      BluePromise.promisifyAll(contract, { suffix: 'Promise' });
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
      const size = await contract.methods.TREE_SIZE().call();
      return size;
    } catch (error) {
      console.error(error);
      return 0;
    }
  };

  export const verifyData = async (data: string, path: Array<string>, index: Number) => {
    try {
      const result = await contract.methods.verify(data, path, index).call();

      return result;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  export const addLeaf = async (newItem: string, path: Array<string>, index: Number) => {
    try {
      console.log({ newItem, path });

      const address = await web3.eth.getAccounts();
      const pathParam = path.map((item: any) => web3.eth.abi.encodeParameter('bytes32', item));
      console.log({ newItem, pathParam, index });
      const gas = await contract.methods
        .addLeaf(web3.eth.abi.encodeParameter('bytes32', newItem), pathParam, index)
        .estimateGas({ from: address[0] });

      const result = await contract.methods
        .addLeaf(web3.eth.abi.encodeParameter('bytes32', newItem), pathParam, index)
        .send({ from: address[0], gas: gas })
        .on('transactionHash', function (hash: any) {
          console.log('hash:', hash);
        })
        .on('confirmation', function (confirmationNumber: any, receipt: any) {
          console.log('confirmationNumber:', confirmationNumber);
          console.log('receipt:', receipt);
        })
        .on('receipt', function (receipt: any) {
          console.log('receipt:', receipt);
        })
        .on('error', function (error: any) {
          console.error('Error', error);
        }); // If a out of gas error, the second parameter is the receipt.

      return result;
    } catch (error) {
      console.error('Adding leaf has failed!', error);
      return false;
    }
  };

  export const updateLeaf = async (data: string, path: Array<string>, index: Number) => {
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
