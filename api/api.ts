import axios, { AxiosResponse } from 'axios';
import Quote from './models/quote';
import DashboardData, { RecommendationCover } from './models/cover';
import { UserAuthentication } from './models/user';
import Token from './models/token';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const HttpRequest = {
  getTokens: (): Promise<AxiosResponse<Token[]>> =>
    instance.get<Token[]>('token'),
  getCovers: (): Promise<AxiosResponse<RecommendationCover[]>> =>
    instance.get<RecommendationCover[]>('cover'),
  getCoverRecommendations: (
    address: string,
  ): Promise<AxiosResponse<DashboardData>> =>
    instance.get<DashboardData>(`cover/recommend/${address}`),
  getUser: (address: string | null | undefined): Promise<AxiosResponse<any>> =>
    instance.get<any>(`user/${address}`),
  getPrivateUser: (
    address: string | null | undefined,
    bearer: string | null,
  ): Promise<AxiosResponse<any>> =>
    instance.get<any>(`user/private/${address}`, {
      headers: { Authorization: `Bearer ${bearer}` },
    }),
  insertUser: (
    address: string | null | undefined,
  ): Promise<AxiosResponse<any>> => instance.post<any>(`user/${address}`),
  authenticate: (data: UserAuthentication): Promise<AxiosResponse<any>> =>
    instance.post<any>(`authentication`, data),
  updateUser: (user: any, bearer: string | null): Promise<AxiosResponse<any>> =>
    instance.put<any>(`user`, user, {
      headers: { Authorization: `Bearer ${bearer}` },
    }),
};

export default HttpRequest;
