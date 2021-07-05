import React, { ReactElement, useEffect, useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import DashboardData, {
  Recommandations,
  UnsuportedTokens,
} from '../../api/models/cover';
import HttpRequest from '../../api/api';
import DashboardBody from '../../components/Dashboard/DashboardBody';

export default function Dashboard(): ReactElement {
  const { account, active } = useWeb3React<Web3Provider>();
  const [dashboardData, setDashboardData] = useState<DashboardData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fethCoverRecommendations = async (accountAddr: string) => {
    setIsLoading(true);
    const { data } = await HttpRequest.getCoverRecommendations(accountAddr);
    setDashboardData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (account) {
      fethCoverRecommendations(account).catch(() => {});
    }
  }, []);

  return <DashboardBody dashboardData={dashboardData} isLoading={isLoading} />;
}
