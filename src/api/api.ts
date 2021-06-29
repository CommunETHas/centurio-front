import axios, {AxiosResponse} from 'axios';
import Quote from './models/quote';
import Cover from './models/cover';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`
});

const HttpRequest = {
  getCovers: (): Promise<AxiosResponse<Quote[]>> => instance.get<Quote[]>('cover'),
  getCoverRecommendations: (address): Promise<AxiosResponse<Cover[]>> => instance.get<Cover[]>(`cover/recommend/${address}`),
  getUser: (address): Promise<AxiosResponse<any>> => instance.get<any>(`user/${address}`),
  insertUser: (address): Promise<AxiosResponse<any>> => instance.post<any>(`user/${address}`),
  authenticate: (data): Promise<AxiosResponse<any>> => instance.post<any>(`authentication`, data),
  unsubscribeUser: (user): Promise<AxiosResponse<any>> => instance.put<any>(`user`, user)
}

export default HttpRequest
