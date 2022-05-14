## API Paths
* these paths can help to call the front end to call the api from the back end, also if needed, the 
* get products - /v1/products?page=1 
* get products by id - v1/products/:id
* filter products by category - v1/products?keyword=apple&category=Laptops
* filter producuts by category and price - v1/products?keyword=apple&price[gte]=5&price[lte]=200
* ![image](https://user-images.githubusercontent.com/73322116/168402336-52e16aba-1354-40bd-9162-76430cae4795.png)
* search by keyword - v1/products?keyword=apple
* ![image](https://user-images.githubusercontent.com/73322116/168402562-8d4f9877-10f4-4353-83e2-d9ee7640e15b.png)
* also uf you checkout product models in 
```
path: Backend/src/app/models/product.ts
```
you can see all the product attributes. if you needed, for example, the seller, you could call it using product.seller etc..
* with redux store you could see these attributes, easier for making calls with axios

## Typescript rules
* indent no more then two spaces -- will cause errors
* Switch cases - one space
* member expresions - pne space
* strings will be single quotes, except jsx rules which are double quotes


## Directories
* src will have all the directiories
* actions/
* components/
* constants/
* reducers/
  
## actions
* authActions
* cartActions
* productActions
  
## components
* layouts/ Header.js. Footer.js
* products/
* route/
* user/
