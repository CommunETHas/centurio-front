import axios, { AxiosResponse } from 'axios';
import Quote from './models/quote';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`
});

const HttpRequest = {
  getCover: (): Promise<AxiosResponse<Quote[]>> => instance.get<Quote[]>('cover')
}

export default HttpRequest
