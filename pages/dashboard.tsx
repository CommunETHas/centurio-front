import React, { ReactElement, useEffect, useState } from "react";
import HttpRequest from "../api/api";
import DashboardBody from "../components/Dashboard/DashboardBody";
import DashboardData from "../api/models/cover";

export default function Dashboard(): ReactElement {
  const [dashboardData, setDashboardData] = useState<DashboardData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fethCoverRecommendations = async (accountAddr: string) => {
    setIsLoading(true);
    const { data } = await HttpRequest.getCoverRecommendations(accountAddr);
    setDashboardData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fethCoverRecommendations("").catch(() => {});
  }, []);

  return <DashboardBody dashboardData={dashboardData} isLoading={isLoading} />;
}
