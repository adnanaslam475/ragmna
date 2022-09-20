module.exports = {
  mysql: {
    host: "sql834.main-hosting.eu",
    user: "u331842776_pvq_admin",
    password: "1QDu1U0Tsgb+",
    database: "u331842776_pvq",
    port: 3306,
  },
  secret: process.env.secret || "exyAU0cwm2weEqyG3Y3C",
  refreshTokenSecret: process.env.refreshTokenSecret || "LdlyhvYRVNkD1wlpIfks",
  tokenLife: parseInt(process.env.tokenLife) || 1 * 86400,
  refreshTokenLife: parseInt(process.env.refreshTokenLife) || 91 * 86400,
  port: 3000,
  stage: process.env.stage || "dev",
  SMTP_HOST: "smtp-relay.sendinblue.com",
  SMTP_PORT: 587,
  SMTP_USERNAME: "einfotouch@gmail.com",
  SMTP_PASSWORD: "AaUCwk8rZGjYgX03",
};
