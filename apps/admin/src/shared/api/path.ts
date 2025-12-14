export const API_PATH = {
  auth: {
    me: '/auth/redot/admin/me',
    signIn: '/auth/redot/admin/sign-in',
    reIssue: '/auth/redot/admin/reissue',
    signOut: '/auth/redot/admin/sign-out',
  },
  admin: {
    root: '/redot/admin',
    detail: (adminId: number) => `/redot/admin/${adminId}`,
    resetPassword: (adminId: number) =>
      `/redot/admin/${adminId}/reset-password`,
    uploadProfileImage: '/redot/admin/upload-profile-image',
  },
  consultation: {
    root: '/redot/admin/consultations',
    detail: (consultationId: number) =>
      `/redot/admin/consultations/${consultationId}`,
  },
};
