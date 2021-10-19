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
// import CarsController from 'App/Controllers/Http/CarsController'

// Route.get('/', async ({ view }) => {
//   return view.render('welcome')
// })


//cars
// Route.get('/cars', async (ctx) => {
//   return new CarsController().cars(ctx)
// })
Route.get('cars', 'CarsController.cars').as('cars.page')
Route.get('cars/:id', 'CarsController.cars_detail').as('cars.detail')
// Route.get('/:id', 'CarsController.cars_detail').as('cars.detail')


// Route.get('/cars/:id',({params}) =>{
//   // return params.id
// })
// Route.get('/cars/:id', async (ctx) => {
//   return new CarsController().cars_detail(ctx)
// })

Route.get('/', async ({ request  }) => {
  
  console.log(request.body())
  console.log(request.all())
  console.log(request.input('title'))
  console.log(request.qs())
  console.log(request.url(true))
  console.log(request.param('id'))
  console.log(request.method())
  // console.log(request.headers())
  const url = Route.makeUrl('/')
  console.log(url)

})






