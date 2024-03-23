import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';

type DetailMessageType = {
  errorType: string;
  message: string;
}

const STATUS_TO_SHOW_ERROR = new Set([
  StatusCodes.BAD_REQUEST,
  StatusCodes.UNAUTHORIZED,
  StatusCodes.NOT_FOUND
]);

const shouldDisplayError = (response: AxiosResponse) => STATUS_TO_SHOW_ERROR.has(response.status);

const BACKEND_URL = 'https://15.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response && shouldDisplayError(error.response)) {
        const messageError = (error.response.data);
        toast.warn(messageError.message);
      }

      throw error;
    }
  );

  return api;
};
