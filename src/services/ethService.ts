import { ethers } from 'ethers';

export const getEthProvider = () => {
  console.log('provider', window.ethereum);
  // @ts-ignore
  return new ethers.providers.Web3Provider(window.ethereum);
};

export const useEthService = (provider: ethers.providers.Web3Provider) => {
  // EIP-1102
  const requestEthProvider = async () => {
    await provider.send('eth_requestAccounts', []);
  };

  // EIP-1193
  const getWalletAdressFromProvider = async () => {
    const account = await provider.send('eth_accounts', []);
    return account;
  };

  return { requestEthProvider, getWalletAdressFromProvider };
};
