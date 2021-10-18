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

// Route.get('/', async ({ view }) => {
//   return view.render('welcome')
// })


//cars
Route.get('/cars', async (ctx) => {
  return new CarsController().cars(ctx)
})
// Route.post('/cars',({request})=>{
//   console.log(request.id)
// })


// Route.get('/user', async (ctx) => {
//   return new CarsController().index(ctx)
// })
// Route.get('cars', 'CarsController.cars');


// Route.get('/cars/:id',({params}) =>{
//   // return params.id
// })
Route.get('/cars/:id', async (ctx) => {
  return new CarsController().cars_detail(ctx)
})



Route.get('/', async ({ request }) => {
  console.log(request.all())
})







