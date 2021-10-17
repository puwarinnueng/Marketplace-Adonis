// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
const axios = require('axios')

export default class CarsController {
  
  //public async cars(ctx: HttpContextContract, {view}) {
  //โหลดหน้าcars
  public async cars({ view }) {
    const results = await axios.get('https://carmana.com/api/v2/cars?min_price=&max_price=&min_mileage=&max_mileage=&min_year=&max_year=&is_certified=false&active_year=all&active_price=all&active_mileage=all&page[number]=1&sort=&include=redbook-info.car-submodel.car-model.car-make,car-photos,wished-car,wisher')
    const carsbox = await axios.get('https://carmana.com/api/v2/car-makes')   

    const cars = results.data.data?.map(car => {
      const photos = car.relationships?.['car-photos']?.data?.map?.(photo => {
        const photoIncluded =  results.data.included?.find(include => {
          return include.id == photo.id && include.type == 'car-photos'
        })
        photo.include = photoIncluded
        return photo
      }) 

      car.photos = photos
      return car
    })

    const year = results.data.data?.map(car => {
      const photos = car.relationships?.['car-photos']?.data?.map?.(photo => {
        const photoIncluded =  results.data.included?.find(include => {
          return include.id == photo.id && include.type == 'car-photos'
        })
        photo.include = photoIncluded
        return photo
      }) 

      car.photos = photos
      return car
    })
    // console.log(year)

    return view.render('pages/cars' , {
      cars: cars, 
      carsbox: carsbox.data.data,
      count_cars: results.data.meta.page?.['total-count'],
    });
  }

  





}
