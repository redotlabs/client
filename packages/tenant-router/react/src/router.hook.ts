import { useTenantContext } from './provider';
import {
  NavigateOptions,
  To,
  useNavigate,
  useLocation,
} from 'react-router-dom';

export const useTenantNavigate = () => {
  const { mergePath } = useTenantContext();

  const _navigate = useNavigate();

  // overload
  function navigate(to: To, options?: NavigateOptions): void | Promise<void>;
  function navigate(delta: number): void | Promise<void>;

  function navigate(
    to: To | number,
    options?: NavigateOptions
  ): void | Promise<void> {
    if (typeof to === 'number') {
      return _navigate(to);
    }
    if (typeof to === 'string') {
      return _navigate(mergePath(to), options);
    }
    if (typeof to === 'object' && to.pathname) {
      return _navigate({ ...to, pathname: mergePath(to.pathname) }, options);
    }
    return _navigate(to, options);
  }

  return navigate;
};

export const useTenantPathname = () => {
  const { subdomain } = useTenantContext();
  const { pathname } = useLocation();
  return pathname.replace(`/s/${subdomain}`, '');
};
