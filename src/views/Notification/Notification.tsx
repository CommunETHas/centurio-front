import React, {useContext, useEffect} from 'react';
import {useWeb3React} from '@web3-react/core';
import {Web3Provider} from '@ethersproject/providers';
import {GlobalContext} from '../../contexts/GlobalContext';
import HttpRequest from '../../api/api';

export default function Notification() {
  const {active, account, library} = useWeb3React<Web3Provider>();
  const {user, saveUser, isUserCreated, setIsUserCreated} = useContext(GlobalContext);

  const fetchUser = async () => {
    await HttpRequest.getUser(account)
        .then(({data}) => {
          setIsUserCreated(true)
          saveUser(data);
        })
        .catch((error) => {
          setIsUserCreated(false)
        });
  };

  const createUser = async () => {
    await HttpRequest.insertUser(account)
  }

  const unscribeUser = async () => {
    await HttpRequest.unsubscribeUser(user)
  }

  const signMessage = () => {
    library
        .getSigner(account)
        .signMessage(
            `Welcome to Centurio, sign this message to authenticate ! ${user.nonce}`,
        )
        .then((signature: any) => {
          HttpRequest.authenticate({address: account, signature});
        })
        .catch((error: any) => {
          console.log(
              'Failure!' + (error && error.message ? `\n\n${error.message}` : ''),
          );
        });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
      <main className="w-screen bg-primary h-screen overflow-auto">
        {active ? (
            <>
              <button
                  type="button"
                  onClick={signMessage}
                  className="absolute z-10 bg-secondary focus:outline-none h-7 w-40 border border-white text-xs text-primary font-bold py-1 px-4 rounded-full transition duration-500 ease-in-out transform hover:translate-y-1 hover:translate-x-1"
              >
                Subscribe
              </button>
              <div
                  className=" bg-transparent focus:outline-none h-7 w-40 border border-white rounded-full transform translate-x-1 translate-y-1"/>
            </>
        ) : (
            <div>You must connect your wallet to subscribe to notification.</div>
        )}
      </main>
  );
}
