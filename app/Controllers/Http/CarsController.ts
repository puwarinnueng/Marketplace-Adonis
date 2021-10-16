// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
const axios = require('axios')

export default class CarsController {
  
  // public async cars(ctx: HttpContextContract, {view}) {
  //     const results = await axios.get('https://carmana.com/api/v2/cars?min_price=&max_price=&min_mileage=&max_mileage=&min_year=&max_year=&is_certified=false&active_year=all&active_price=all&active_mileage=all&page[number]=1&sort=&include=redbook-info.car-submodel.car-model.car-make,car-photos,wished-car,wisher');
  //     const carsbox = await axios.get('https://carmana.com/api/v2/car-makes')   
  //     // console.log(results.data) //array data
         
  //     return view.render('pages/cars' , {
  //       results: results.data.data,   
  //       carsbox: carsbox.data.data  
  //     });    
  // }

  // public async cars({view}){
  //     return view.render('cars')

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

    // console.log(cars[0].photos)
        
    return view.render('pages/cars' , {
      cars: cars,
      // final:  results.data,     
      // results: results.data.data,   
      // results2: results.data.included,   
      carsbox: carsbox.data.data,
    });
  }

  public async carstypebox({ view }) {
    const carsbox = await axios.get('https://carmana.com/api/v2/car-makes')
       
    return view.render('components/cartypebox' , {
      carsbox: carsbox.data.data,     
    });
  }



}
