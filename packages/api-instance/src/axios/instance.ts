import axios from 'axios';

const TIMEOUT_TIME = 15_000; // 15 seconds

interface CreateAxiosInstanceOptions {
  baseURL: string;
  timeout?: number;
}

const createAxiosInstance = ({
  baseURL,
  timeout = TIMEOUT_TIME,
}: CreateAxiosInstanceOptions) => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true, // cookie on
  });

  // Request interceptor for API calls
  instance.interceptors.request.use(
    async (config) => {
      /**
       * 최신 요청 타임아웃 설정 방법 (axios documentation)
       * https://axios-http.com/docs/cancellation
       */
      config.signal = AbortSignal.timeout(timeout);
      return config;
    },
    (error) =>
      Promise.reject(
        (error.response && error.response.data) || 'Something went wrong'
      )
  );

  instance.interceptors.response.use(
    (response) => response.data,
    async (error) => {
      // AbortController로 요청 취소된 경우
      const isCanceled =
        error.code === 'ERR_CANCELED' && error.config.signal.aborted;
      if (isCanceled) {
        // network error handling
        return Promise.resolve(); // 취소된 요청은 성공처럼 처리
      }

      // Unauthorized
      if (error.response?.status === 401) {
        // other unauthorized error handling
        return Promise.reject(new Error('Expired session'));
      }

      // Other errors
      return Promise.reject(
        (error.response && error.response.data) || 'Something went wrong'
      );
    }
  );

  return instance;
};

export default createAxiosInstance;
