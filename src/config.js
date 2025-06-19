import { config } from "dotenv";
config();

export const BD_HOST = process.env.BD_HOST || 'bhy2ufbh4mjfqpqsg59p-mysql.services.clever-cloud.com';
export const BD_DATABASE = process.env.BD_DATABASE || 'bhy2ufbh4mjfqpqsg59p';
export const BD_USER = process.env.BD_USER || 'uhvldljb6u6dcpyp';
export const BD_PASSWORD = process.env.BD_PASSWORD || 'zvip6Sj2JFBcGz2orT3Y';
export const BD_PORT = process.env.BD_PORT || 3306;
export const PORT = process.env.PORT || 3000;
