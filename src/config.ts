import dotenv from 'dotenv';
dotenv.config();

export enum EnumEnvironment {
  Prod = 'prod',
  Dev = 'dev',
}

export const generalConfig = {
  env: process.env.ENV,
  isOffline: process.env.ENV === 'dev' ? true : false
}