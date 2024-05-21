import Express from "express";
import log from "morgan";

const app = Express();

app.use(log('develompemnt'));

app.use(Express.json());
app.use(Express.urlencoded({extended: true}));


export default app;