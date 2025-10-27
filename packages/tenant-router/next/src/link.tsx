import Link from 'next/link';
import { useTenantContext } from './provider';
import type { ComponentProps } from 'react';

type TenantLinkProps = ComponentProps<typeof Link>;

const TenantLink = ({ href, children, ...props }: TenantLinkProps) => {
  const { mergePath } = useTenantContext();

  if (typeof href === 'string') {
    return (
      <Link href={mergePath(href)} {...props}>
        {children}
      </Link>
    );
  }

  if (typeof href === 'object' && href.pathname) {
    return (
      <Link href={{ ...href, pathname: mergePath(href.pathname) }} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
};

export default TenantLink;
