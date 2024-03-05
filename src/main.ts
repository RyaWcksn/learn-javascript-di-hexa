import { server } from "./server/Server";

const port: number = 3000;

const svr = server(port);
svr.startServer();
