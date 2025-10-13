export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { server } = await import('./_mock/node');
    server.listen();
    console.log('[MSW] Server-side mocking enabled');
  }
}
