import { ethers } from 'ethers';

export const isBrowserProviderInstalled = () =>
  Object.prototype.hasOwnProperty.call(window, 'ethereum');

export const getBrowserProvider = () => {
  if (isBrowserProviderInstalled()) {
    return new ethers.providers.Web3Provider(window.ethereum);
  }
};

export const ethService = (provider: ethers.providers.Web3Provider) => {
  // EIP-1102
  const requestProviderSignIn = async () => {
    await provider.send('eth_requestAccounts', []);
  };

  // EIP-1193
  const getWalletAddressFromProvider = async () => {
    const [account] = await provider.send('eth_accounts', []);
    return account;
  };

  return { requestProviderSignIn, getWalletAddressFromProvider };
};
