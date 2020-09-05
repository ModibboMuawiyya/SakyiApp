import axios, { AxiosResponse } from "axios";
import { IFabric } from "../modules/fabric";
import { resolve } from "dns";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );

const requests = {
  get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
  post: (url: string, body: {}) =>
    axios.post(url, body).then(sleep(1000)).then(responseBody),
  put: (url: string, body: {}) =>
    axios.put(url, body).then(sleep(1000)).then(responseBody),
  del: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody),
};

const Fabrics = {
  list: (): Promise<IFabric[]> => requests.get("/fabrics"),
  details: (id: string) => requests.get(`/fabrics/${id}`),
  create: (fabric: IFabric) => requests.post("/fabrics", fabric),
  update: (fabric: IFabric) => requests.put(`/fabrics/${fabric.id}`, fabric),
  delete: (id: string) => requests.del(`/fabrics/${id}`),
};

export default {
  Fabrics,
};
