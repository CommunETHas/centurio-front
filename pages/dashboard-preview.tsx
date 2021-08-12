import React, { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DashboardData from '../api/models/cover';
import HttpRequest from '../api/api';
import DashboardBody from '../components/Dashboard/DashboardBody';

export default function DashboardPreview(): ReactElement {
  const [dashboardData, setDashboardData] = useState<DashboardData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const fethCoverRecommendations = async (accountAddr: string) => {
    setIsLoading(true);
    const { data } = await HttpRequest.getCoverRecommendations(accountAddr);
    setDashboardData(data);
    setIsLoading(false);
  }
  useEffect(() => {
    if (!router.isReady) return;
    if (router.query.address) {
      fethCoverRecommendations(router.query.address as string).catch(() => {});
    }
  }, [router.isReady]);

  return <DashboardBody dashboardData={dashboardData} isLoading={isLoading} />;
}
