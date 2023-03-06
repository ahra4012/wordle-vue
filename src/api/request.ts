import aixos, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { ResultEnum } from "@/api/httpEnum";
import router from "@/routers";
import { ResultData } from "./interface";

const config = {
  timeout: ResultEnum.TIMEOUT as number,
};

class RequestHttp {
  service: AxiosInstance;
  public constructor(config: AxiosRequestConfig) {
    this.service = aixos.create(config);
    this.service.interceptors.request.use(
      (config) => {
        //config.headers!.noLoading || showFullScreenLoading();

        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    this.service.interceptors.response.use(async (response: AxiosResponse) => {
      const { data } = response;
      if (Object.keys(data).includes("result") == false) {
        const obj: ResultData = {
          result: data[0],
          code: response.status,
          message: response.statusText,
        };
        return obj;
      }
      if (
        data.statusCode != ResultEnum.SUCCESS &&
        data.statusCode != ResultEnum.NULL
      ) {
        return Promise.reject(data);
      } else if (data.statusCode == ResultEnum.ERROR) {
        router.replace("/500");
      }

      return data;
    });
  }
  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object });
  }
  post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, params, _object);
  }
  put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.put(url, params, _object);
  }
  delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ..._object });
  }
}

export default new RequestHttp(config);
