import React, { BaseSyntheticEvent, Fragment, ReactElement } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { Transition, Popover } from '@headlessui/react';
import { useWeb3React } from '@web3-react/core';
import { useHistory } from 'react-router-dom';
import Help from '../../assets/icons/help.svg';
import DashboardData, { Recommandations } from '../../api/models/cover';
import QuoteCard from '../Card/QuoteCard';
import QuoteCardFake from '../Card/QuoteCardFake';
import fakeDashBoardData from '../../api/fakeData/fakeDashBoardData';
import Footer from '../../views/Footer/Footer';
import IconButtonHelper from '../Button/IconButtonHelper';

export interface DashboardBodyProps {
  dashboardData: DashboardData | undefined;
  isLoading: boolean;
}

export default function DashboardBody(props: DashboardBodyProps): ReactElement {
  const { dashboardData, isLoading } = props;
  const { account, active } = useWeb3React<Web3Provider>();
  const history = useHistory();
  return (
    <main className="w-screen bg-primary">
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
                      <IconButtonHelper
                        textContent="Our recommandations are not based on these
                                      assets as we do not yet support them"
                      />
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
              <IconButtonHelper
                textContent={
                  'Here you can see which covers is recommended for your\n' +
                  "                        wallet. Be aware that custodian placement can't be\n" +
                  '                        detected.'
                }
              />
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
          {dashboardData &&
          dashboardData.recommandations &&
          dashboardData.recommandations.length > 0 ? (
            <div className="w-full grid gap-x-32 gap-y-32 xl:grid-cols-2 2xl:grid-cols-3 px-20">
              {dashboardData.recommandations.map((recommendation) => (
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
