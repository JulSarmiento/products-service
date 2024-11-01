import Express from "express";
import log from "morgan";

import routes from "./routes/index.js";
import { errorHandler, validateApiKey } from "./middlewares/index.js";
import cors from "cors";

const app = Express();
app.use(cors());
app.use(log(process.env.NODE_ENV === 'development' ? 'combined' : 'dev'));

app.use(Express.json());
app.use(Express.urlencoded({extended: true}));

// app.use(validateApiKey);

app.use(routes);

app.use(errorHandler);


export default app;