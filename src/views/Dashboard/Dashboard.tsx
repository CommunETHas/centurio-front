import React, {
  BaseSyntheticEvent, Fragment,
  ReactElement, useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { Transition, Popover } from '@headlessui/react';
import { useWeb3React } from '@web3-react/core';
import QuoteCard from '../../components/QuoteCard';
import { Recommendations, UnsuportedTokens } from '../../api/models/cover';
import Help from '../../assets/icons/help.svg';
import HttpRequest from '../../api/api';

export default function Dashboard(): ReactElement {
  const { account, active } = useWeb3React<Web3Provider>();
  const [recommendations, setRecommendations] = useState<Recommendations[]>([]);
  const [tooltipIsDisplay, setTooltipIsDisplay] = useState<boolean>(false);
  const [unsupportedTokens, setUnsupportedTokens] = useState<
    UnsuportedTokens[]
  >([]);

  const fethCoverRecommendations = async (accountAddr: string) => {
    const { data } = await HttpRequest.getCoverRecommendations(
      '0xef7dfa2a8213cd9814f258ac5e09044f2f3a826c',
    );
    if (data.recommendations) {
      setRecommendations(data.recommendations);
    }
    if (data.unsuportedTokens) {
      setUnsupportedTokens(data.unsuportedTokens);
    }
  };

  const displayPopup = () => {
    setTooltipIsDisplay(!tooltipIsDisplay);
  };

  useEffect(() => {
    if (account) {
      fethCoverRecommendations(account).catch(() => {});
    }
  }, []);

  return (
    <main className="w-screen bg-primary h-screen overflow-auto">
      <div className="w-full flex justify-center my-10">
        <div className="flex flex-col">
          {unsupportedTokens && unsupportedTokens.length > 0 ? (
            <>
              <div className="relative w-full rounded-lg">
                <div className="absolute rounded-lg w-full h-full -right-2 -bottom-2 bg-transparent border border-ternary" />
                <div className="relative p-4 rounded-lg bg-ternary z-10 text-secondary">
                  <div className="font-bold">Unrecognized assets:</div>
                  <div className="mt-2 grid xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-4">
                    {unsupportedTokens.map((token) => (
                      <div className="flex gap-x-2">
                        <img
                          src={token.logoUrl}
                          onError={(e: BaseSyntheticEvent) => {
                            e.target.src = '/src/assets/icons/help.svg';
                          }}
                          className="ml-2 w-6 h-6 rounded-md"
                          alt="unreconizedAssets"
                        />
                        <span>{token.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
          <div className="flex flex-row justify-center">
            <div className="relative mt-6 flex flex-col">
              <span className="flex text-secondary font-bold text-xl">
                COVERS RECOMMENDATIONS
              </span>
                <Popover className='absolute right-0 transform translate-x-8'>
                  {({ open }) => (
                    <>
                      <Popover.Button>
                        <img
                          className="h-7 w-7 transform cursor-pointer"
                          src={Help}
                          alt="help"
                        />
                      </Popover.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute z-10">
                            <div className="overflow-hidden relative z-50 px-5 pt-2 pb-3 w-60 bg-secondary rounded-lg">
                              <div className="flex flex-col">
                                <div className="flex flex-row justify-between">
                                  <span className="font-bold">Info: </span>
                                </div>
                                <span className="text-sm">
                                  {'Here you can see which covers is recommended for your\n' +
                                  "                        wallet. Be aware that custodian placement can't be\n" +
                                  '                        detected.'}
                                </span>
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              </div>
            </div>
          </div>
      </div>
        {recommendations && recommendations.length > 0 ? (
          <div className="w-full grid gap-x-32 gap-y-32 xl:grid-cols-2 2xl:grid-cols-3 px-20">
            {recommendations.map((recommendation) => (
              <QuoteCard
                cover={recommendation.cover}
                reasoning={recommendation.reasoning}
              />
            ))}
          </div>
        ) : (
          <div className="w-full px-20">
            {active ? (
              <span className="text-secondary">
                Sorry ! We have no recommendations based on your assets.
              </span>
            ) : (
              <span className="text-secondary">
                You must connect your wallet to view recommendations.
              </span>
            )}
          </div>
        )}
    </main>
  );
}
