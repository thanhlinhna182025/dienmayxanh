import express, { json } from 'express';
import productRouter from './route/productRoute';
const PORT = process.env.PORT || 4000;
const app = express();

app.use(json());

//Router
app.use('/api/product', productRouter);

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));

export default app;
