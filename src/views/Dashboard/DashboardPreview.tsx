import React, { ReactElement, useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import DashboardData, {
  Recommandations,
  UnsuportedTokens,
} from '../../api/models/cover';
import HttpRequest from '../../api/api';
import DashboardBody from '../../components/Dashboard/DashboardBody';

export default function DashboardPreview(): ReactElement {
  const [dashboardData, setDashboardData] = useState<DashboardData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { search } = useLocation();
  const history = useHistory();

  const fethCoverRecommendations = async (accountAddr: string) => {
    setIsLoading(true);
    const { data } = await HttpRequest.getCoverRecommendations(accountAddr);
    setDashboardData(data);
    setIsLoading(false);
  };
  useEffect(() => {
    history.listen((location) => {
      fethCoverRecommendations(location.search.replace('?address=', '')).catch(
        () => {},
      );
    });
    const address = new URLSearchParams(search).get('address');
    if (address) {
      fethCoverRecommendations(address).catch(() => {});
    }
  }, []);

  return <DashboardBody dashboardData={dashboardData} isLoading={isLoading} />;
}
