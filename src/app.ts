import "dotenv/config";
import router from "./routes";
import { server } from "./core";

server(process.env.LMS_PORT ?? 3000, router, process.env.LMS_BASEURL);
