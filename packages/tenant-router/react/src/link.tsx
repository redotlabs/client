import { PropsWithChildren } from 'react';
import { useTenantContext } from './provider';
import { Link, LinkProps } from 'react-router-dom';

const TenantLink = ({
  to,
  children,
  ...props
}: PropsWithChildren<LinkProps>) => {
  const { mergePath } = useTenantContext();

  if (typeof to === 'string') {
    return (
      <Link to={mergePath(to)} {...props}>
        {children}
      </Link>
    );
  }

  if (typeof to === 'object' && to.pathname) {
    return (
      <Link to={{ ...to, pathname: mergePath(to.pathname) }} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <Link to={to} {...props}>
      {children}
    </Link>
  );
};

export default TenantLink;
