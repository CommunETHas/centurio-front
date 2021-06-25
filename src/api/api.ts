import axios, { AxiosResponse } from 'axios';
import Quote from './models/quote';

const instance = axios.create({
  baseURL: `http://localhost:8080/`
});

const HttpRequest = {
  getCover: (): Promise<AxiosResponse<Quote[]>> => instance.get<Quote[]>('cover')
}

export default HttpRequest
