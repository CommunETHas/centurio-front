import { ethers } from 'ethers';

export const getEthProvider = () => {
  try {
    return new ethers.providers.Web3Provider(window.ethereum);
  } catch {
    throw new Error('No Web3 detected');
  }
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
