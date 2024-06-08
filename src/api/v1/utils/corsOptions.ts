export const corsOptions = {
  origin: [
    `https://${process.env.PROJECT_DOMAIN}`,
    `https://www.${process.env.PROJECT_DOMAIN}`,
    `https://dashboard.${process.env.PROJECT_DOMAIN}`,
    `https://recommend-server.${process.env.PROJECT_DOMAIN}`,
  ],
};

if (process.env.NODE_ENV === 'dev') {
  corsOptions.origin.push('http://localhost:3000');
}
