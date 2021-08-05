import React, { ReactElement, useContext, useEffect, useState } from 'react';
import HttpRequest from '../api/api';
import DashboardBody from '../components/Dashboard/DashboardBody';
import DashboardData from '../api/models/cover';
import { EthContext } from '../contexts/EthContext';
import { EthContextType } from '../api/models/user';

export default function Dashboard(): ReactElement {
  const [dashboardData, setDashboardData] = useState<DashboardData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { account } = useContext(EthContext) as EthContextType;
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
  }, [account]);

  return <DashboardBody dashboardData={dashboardData} isLoading={isLoading} />;
}
