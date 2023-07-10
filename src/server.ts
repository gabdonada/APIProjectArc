import fastify, { FastifyRequest, FastifyReply } from 'fastify';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

import Cart from './backend/Cart';
import { Fetcher } from './backend/Fetcher';
import CartModel, { CartType } from './model/Cart';

dotenv.config();
const app = fastify();

// MongoDB connection
const mongoURL = process.env.DB_CONN_STRING;
const client = new MongoClient(mongoURL || 'mongodb://localhost:27017/carts');
client.connect();
const db = client.db();

// Create an instance of CartModel
const cart = new CartModel(db);

const cartActions = new Cart(cart);

interface ProductsResponse {
    products: CartType[];
    total: number;
    skip: number;
    limit: number;
}

//List
app.get('/', () => {
    return "Welcome to our site, run routes to see our products and buy it."
})

app.get('/all', async () => {
    return Fetcher('https://dummyjson.com/products/');
})

app.get('/category/:cat', async (req: FastifyRequest<{ Params: { cat: string } }>, res: FastifyReply) => {
    const response = await Fetcher('https://dummyjson.com/products/');
    const responseBody = await response.text();
    const data = JSON.parse(responseBody) as ProductsResponse;
    const filtered = data.products.filter(product => product.category === req.params.cat);
    return filtered
})

app.get('/category/:cat/:brand', async (req: FastifyRequest<{ Params: { cat: string, brand: string } }>, res: FastifyReply) => {
    const response = await Fetcher('https://dummyjson.com/products/');
    const responseBody = await response.text();
    const data = JSON.parse(responseBody) as ProductsResponse;
    let filtered = data.products.filter(product => product.category === req.params.cat);
    filtered = data.products.filter(product => product.brand === req.params.brand);
    return filtered
})


//Cart
app.post('/cart/add/:itemId', async (req: FastifyRequest<{ Params: { itemId: number } }>, res: FastifyReply) => {
    const response = await Fetcher('https://dummyjson.com/products/');
    const responseBody = await response.text();
    const data = await JSON.parse(responseBody) as ProductsResponse;
    let filtered = await data.products.find(product => product.id === Number(req.params.itemId));
    if(filtered){
        cartActions.addCartItem(filtered)
        return filtered
    }
    return 'Product doesnt exist'
})
app.delete('/cart/removeItem/:itemId', async (req: FastifyRequest<{ Params: { itemId: string } }>, res: FastifyReply) => {
    return await cartActions.deleteCartItem(Number(req.params.itemId));
})
app.get('/cart/get', async () => {
    return await cartActions.listCartItems();
})
app.post('/cart/buy', async () => {
    const listItems = await cartActions.listCartItems();
    if (Array.isArray(listItems)) {
        if(listItems.length > 0){
            let totalPrice:number=0;
            let totalProducts:number=0;
            for(const item of listItems){
                totalPrice+=item.price;
                totalProducts++;
            }
            return `You are buying ${totalProducts} with the final price ${totalPrice}`
        } else {
            return 'There is no products in your cart'
        }
    } else {
      return `Error when generating price`
    }
})


app.listen({
    port: 3333,
}).then(()=>{
    console.log("HHTP server running on 3333; lunch on your browser http://localhost:3333/")
}).catch((err)=>{
    console.error(`HHTP server issue: ${err}`)
})
