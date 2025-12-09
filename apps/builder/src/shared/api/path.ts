export const API_PATH = {
  auth: {
    me: '/auth/app/cms/me',
    reIssue: '/auth/app/cms/reissue',
  },
  app: {
    root: '/app',
    bySubdomain: '/app/by-subdomain',
    page: {
      versions: '/app/cms/pages/versions',
      detail: (pageId: number) => `/app/cms/pages/${pageId}`,
    },
  },
};
