import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
const axios = require('axios')
// const validate = require('validator')

export default class CarsController {

  // public async cars({ view }) {
  public async cars({ request, view }: HttpContextContract) {
    
    // console.log(request.all())
    let pa = request.all()
    let pagenow = 1 | pa.page
    // console.log(pagenow)
   

    let endpoint = `https://carmana.com/api/v2/cars?min_price=&max_price=&min_mileage=&max_mileage=&min_year=&max_year=&is_certified=false&active_year=all&active_price=all&active_mileage=all&page[number]=${pagenow}&sort=&include=redbook-info.car-submodel.car-model.car-make,car-photos,wished-car,wisher`
    let results = await axios.get(endpoint)
    let carsbox = await axios.get('https://carmana.com/api/v2/car-makes')

    const cars = results.data.data?.map(car => {
      const photos = car.relationships?.['car-photos']?.data?.map?.(photo => {
        const photoIncluded = results.data.included?.find(include => {
          return include.id == photo.id && include.type == 'car-photos'
        })
        photo.include = photoIncluded
        return photo
      })

      car.photos = photos
      return car
    })

    //pagination 
    var countpage = results.data.meta.page?.['total-pages']
    var num; var pages = [1]
    for (num = 2; num <= countpage; num++) {
      pages.push(num)
    }
    
    //load view
    return view.render('pages/cars', {
      cars: cars,
      carsbox: carsbox.data.data,
      count_cars: results.data.meta.page?.['total-count'],
      pages: pages
    });
  }




  // public async index(ctx: HttpContextContract,{view}) {
  public async cars_detail({ view, request }) {
    const id = request.param('id')
    // const id = request.param('id')
    // console.log(id)
    return view.render('pages/cars_detail', {
      id: id,
    });
  }

}
