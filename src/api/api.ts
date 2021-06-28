import axios, {AxiosResponse} from 'axios';
import Quote from './models/quote';
import Cover from './models/cover';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
});

const HttpRequest = {
  getCover: (): Promise<AxiosResponse<Quote[]>> => instance.get<Quote[]>('cover'),
  getCoverRecommendations: (address): Promise<AxiosResponse<Cover[]>> => instance.get<Cover[]>(`cover/recommend/${address}`)
}

export default HttpRequest
