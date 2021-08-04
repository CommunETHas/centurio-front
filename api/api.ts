import axios, { AxiosResponse } from "axios";
import Quote from "./models/quote";
import DashboardData from "./models/cover";
import { UserAuthentication } from "./models/user";

const instance = axios.create({
  baseURL: `https://pure-escarpment-71696.herokuapp.com/`,
});

const HttpRequest = {
  getCovers: (): Promise<AxiosResponse<Quote[]>> =>
    instance.get<Quote[]>("cover"),
  getCoverRecommendations: (
    address: string
  ): Promise<AxiosResponse<DashboardData>> =>
    instance.get<DashboardData>(`cover/recommend/${address}`),
  getUser: (address: string | null | undefined): Promise<AxiosResponse<any>> =>
    instance.get<any>(`user/${address}`),
  insertUser: (
    address: string | null | undefined
  ): Promise<AxiosResponse<any>> => instance.post<any>(`user/${address}`),
  authenticate: (data: UserAuthentication): Promise<AxiosResponse<any>> =>
    instance.post<any>(`authentication`, data),
  updateUser: (user: any, bearer: string | null): Promise<AxiosResponse<any>> =>
    instance.put<any>(`user`, user, {
      headers: { Authorization: `Bearer ${bearer}` },
    }),
};

export default HttpRequest;
