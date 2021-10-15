/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import CarsController from 'App/Controllers/Http/CarsController'

//route เรียก ctrl1
Route.get('/cars', async (ctx) => {
  return new CarsController().cars(ctx)
})

//route เรียก ctrl2
// Route.get('/cars', 'CarsController.cars');
Route.get('/cars1', 'CarsController.carstypebox');



//default rount
Route.get('/', async ({ view }) => {
  return view.render('welcome')
})
