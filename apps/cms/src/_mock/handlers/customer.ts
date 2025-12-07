import { API_PATH } from '@/shared/api/path';
import { delay, http, HttpResponse } from 'msw';
import { MOCK_CUSTOMER } from '../utils/constants';
import { MOCK_API_BASE } from '../utils/constants';
import { subdomainInterceptor } from '../utils/interceptor';
import { SUBDOMAIN_HEADER } from '@/shared/constants/env-variables';

const customerHandlers = () => [
  http.get(
    MOCK_API_BASE + API_PATH.app.bySubdomain,
    subdomainInterceptor(_getCustomer)
  ),
];

const _getCustomer: Parameters<typeof http.get>[1] = async ({ request }) => {
  await delay(1000);
  const subdomain = request.headers.get(SUBDOMAIN_HEADER);

  if (subdomain === MOCK_CUSTOMER.subdomain) {
    return HttpResponse.json({ ...MOCK_CUSTOMER });
  }

  return HttpResponse.json(
    { message: '고객 정보가 일치하지 않습니다.' },
    { status: 401 }
  );
};

export default customerHandlers();
