import React, { useEffect, useState } from 'react';
import QuoteCard from '../../components/QuoteCard';
import HttpRequest from '../../api/api';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

export default function Dashboard() {
  const { account, active } = useWeb3React<Web3Provider>();
  const [recommendations, setRecommendations] = useState([]);

  const fethCoverRecommendations = async () => {
    const { recommandations } = await HttpRequest.getCoverRecommendations(
      account,
    );
    setRecommendations(recommandations);
  };

  useEffect(() => {
    fethCoverRecommendations();
  }, []);

  return (
    <main className="w-screen bg-primary h-screen overflow-auto">
      <div className="w-full flex justify-center my-20">
        <div className="flex flex-col">
          <span className="text-secondary font-bold text-xl">
            COVERS RECOMMENDATIONS
          </span>
          <div className="mt-3 px-8 w-full flex flex-row">
            <div className="w-full h-0.5 bg-secondary" />
          </div>
        </div>
      </div>
      <div className="w-full grid gap-x-32 gap-y-32 xl:grid-cols-2 2xl:grid-cols-3 px-20">
        {/* eslint-disable-next-line react/destructuring-assignment */}
        {recommendations.length > 0 ? (
          <>
            {recommendations.map(({ cover }) => (
              <QuoteCard
                name={cover.name}
                logo={`https://app.nexusmutual.io/logos/${cover.logo}`}
                type={cover.type}
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
