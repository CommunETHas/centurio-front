import { ethers } from 'ethers';

const useEthService = (provider: ethers.providers.Web3Provider) => {
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

export default useEthService;
