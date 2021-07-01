import React, { ReactElement, useEffect, useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import QuoteCard from '../../components/QuoteCard';
import { Recommendations, UnsupportedTokens } from '../../api/models/cover';
import data from '../../api/fakeData/fakeDashBoardData';
import Help from '../../assets/icons/help.svg';
import ShieldLogo from '../../assets/logo_shield_variant_ternary.png';

export default function Dashboard(): ReactElement {
  const { account, active } = useWeb3React<Web3Provider>();
  const [recommendations, setRecommendations] = useState<Recommendations[]>([]);
  const [unsupportedTokens, setUnsupportedTokens] = useState<
    UnsupportedTokens[]
  >([]);

  async function fethCoverRecommendations(accountAddr: string) {
    console.log('data', data.recommendations);
    setRecommendations(data.recommendations);
    setUnsupportedTokens(data.unsupportedTokens);
    // const { data } = await HttpRequest.getCoverRecommendations(accountAddr);
    // if (data.recommendations) {
    //
    //   setRecommendations(data.recommendations);
    // } else {
    //   setRecommendations([]);
    // }
  }

  useEffect(() => {
    if (account) {
      fethCoverRecommendations(account).catch(() =>
        console.log('[Error]: fetch cover recommendation'),
      );
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
                  <div className="mt-2 grid md:grid-cols-5 sm:grid-cols-3 gap-4">
                    {unsupportedTokens.map((token) => (
                      <div className="flex gap-x-2">
                        <img
                          src={token.symbol}
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
              <div className="absolute bg-ternary top-1 -right-9 h-6 w-6 rounded-full" />
              <img
                className="absolute -right-9 h-7 w-7"
                src={Help}
                alt="help"
              />
              <div className="mt-2 w-full px-5">
                <div className="w-full h-0.5 bg-secondary" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full grid gap-x-32 gap-y-32 xl:grid-cols-2 2xl:grid-cols-3 px-20">
        {recommendations && recommendations.length > 0 ? (
          <>
            {recommendations.map((recommendation) => (
              <QuoteCard
                cover={recommendation.cover}
                reasoning={recommendation.reasoning}
              />
            ))}
          </>
        ) : (
          <>
            {active ? (
              <span className="text-secondary">
                Sorry ! You have no recommendations based on your asset.
              </span>
            ) : (
              <span className="text-secondary">
                You must connect your wallet to view recommendations
              </span>
            )}
          </>
        )}
      </div>
    </main>
  );
}
