
const hostName = window.location.hostname;
const isDev = hostName === "abc"
console.log(process.env.REACT_APP_DEV_BASE, "process.env.REACT_APP_DEV_BASE");

export const baseUrl = isDev ? process.env.REACT_APP_DEV_BASE : process.env.REACT_APP_DEV_BASE
