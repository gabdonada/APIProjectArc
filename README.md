# APIProjectArc

## Starting:
1- run `npm install --legacy-peer-deps`
2- add `.env` file and add your Mongo credentials
3- run `npm run devwatch`or `npm run dev` to start the project
4- have fun

## Routers:
`/` this route is a welcome page.
`/all` will list you all the produtcts
`/category/<cat>` this route will filter the categories that you want, exaple: `/category/smartphones`
`/category/:cat/:brand` this route will finter the category and the brand, example: `/category/smartphones/Apple`
`/cart/add/:itemId` this route will add an item to cart by ID, example: `/cart/add/1`
`/cart/removeItem/:itemId` this route will delete an item to cart by ID, example: `/cart/removeItem/1`
`/cart/get` this route will list your cart
`/cart/buy` this route will show you how much you need to pay

## Note:
Note that the URL will depends on the port that you defined. The project is pre-configured in localhost:3333