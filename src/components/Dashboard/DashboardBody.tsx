import React, { BaseSyntheticEvent, Fragment, ReactElement } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { Transition, Popover } from '@headlessui/react';
import { useWeb3React } from '@web3-react/core';
import { useHistory } from 'react-router-dom';
import Help from '../../assets/icons/help.svg';
import DashboardData, { Recommandations } from '../../api/models/cover';
import QuoteCard from '../QuoteCard';
import QuoteCardFake from '../QuoteCardFake';
import fakeDashBoardData from '../../api/fakeData/fakeDashBoardData';

export interface DashboardBodyProps {
  dashboardData: DashboardData | undefined;
  isLoading: boolean;
}

export default function DashboardBody(props: DashboardBodyProps): ReactElement {
  const { dashboardData, isLoading } = props;
  const { account, active } = useWeb3React<Web3Provider>();
  const history = useHistory();
  return (
    <main className="w-screen bg-primary h-screen overflow-auto">
      <div className="w-full flex justify-center my-10">
        <div className="flex flex-col">
          {dashboardData &&
          dashboardData.unsuportedTokens &&
          dashboardData.unsuportedTokens.length > 0 ? (
            <>
              <Transition
                as={Fragment}
                show={!isLoading}
                enter="transform transition duration-[400ms]"
                enterFrom="opacity-0 scale-50"
                enterTo="opacity-100 scale-100"
              >
                <div className="relative w-full rounded-lg">
                  <div className="absolute rounded-lg w-full h-full -right-2 -bottom-2 bg-transparent border border-ternary" />
                  <div className="relative p-4 rounded-lg bg-ternary z-10 text-secondary flex flex-col">
                    <div className="flex flex-row">
                      <div className="font-bold mr-1">
                        <span>Unsupported assets</span>
                      </div>
                      <Popover>
                        {({ open }) => (
                          <>
                            <Popover.Button>
                              <img
                                className="h-7 w-7 cursor-pointer transform -translate-y-1"
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
                              <Popover.Panel className="absolute">
                                <div className="overflow-hidden relative px-5 pt-2 pb-3 w-60 bg-secondary rounded-lg border border-ternary text-black">
                                  <div className="flex flex-col">
                                    <div className="flex flex-row justify-between">
                                      <span className="font-bold">Info: </span>
                                    </div>
                                    <span className="text-sm">
                                      Our recommandations are not based on these
                                      assets as we do not yet support them
                                    </span>
                                  </div>
                                </div>
                              </Popover.Panel>
                            </Transition>
                          </>
                        )}
                      </Popover>
                    </div>
                    <div className="mt-2 grid xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-4">
                      {dashboardData.unsuportedTokens.map((token) => (
                        <div className="flex gap-x-2" key={token.address}>
                          <img
                            src={token.logoUrl}
                            onError={(e: BaseSyntheticEvent) => {
                              e.target.src = Help;
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
              </Transition>
            </>
          ) : (
            <></>
          )}
          <div className="flex flex-row justify-center z-50">
            <div className="relative mt-6 flex flex-col">
              <span className="flex text-secondary font-bold text-xl">
                COVERS RECOMMENDATIONS
              </span>
              <Popover className="absolute right-0 transform translate-x-8">
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
                      <Popover.Panel className="absolute">
                        <div className="overflow-hidden relative px-5 pt-2 pb-3 w-60 bg-secondary rounded-lg border border-ternary text-black">
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
      {isLoading ? (
        <>
          <div className="w-full grid gap-x-32 gap-y-32 xl:grid-cols-2 2xl:grid-cols-3 px-20">
            {Array.from({ length: 8 }).map(() => (
              <QuoteCardFake />
            ))}
          </div>
        </>
      ) : (
        <>
          {fakeDashBoardData &&
          fakeDashBoardData.recommandations &&
          fakeDashBoardData.recommandations.length > 0 ? (
            <div className="w-full grid gap-x-32 gap-y-32 xl:grid-cols-2 2xl:grid-cols-3 px-20">
              {fakeDashBoardData.recommandations.map((recommendation) => (
                <QuoteCard
                  cover={recommendation.cover}
                  reasoning={recommendation.reasoning}
                />
              ))}
            </div>
          ) : (
            <div className="w-full px-20">
              {active || history.location.pathname === 'dashboard-preview' ? (
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
        </>
      )}
    </main>
  );
}
