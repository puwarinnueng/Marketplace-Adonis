import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
const axios = require('axios')

export default class CarsController {

  // public async cars({ view }) {
  public async cars({ request, view }: HttpContextContract) {
    
    //id ของ page
    const currentpage = request.input('page', 1)
    // console.log(currentpage)

    //id ของกล่องช้างๆ
    const carsboxdetailid = request.input('carsboxdetailid', 1)
    
    //กรองยี่ห้อรถ
    const grong = request.input('carBrandAndModel', "")
    console.log(grong)
    const brandcars =  request.input(`&car_make[]=${grong}`, "")
    console.log(brandcars)

    let endpoint = `https://carmana.com/api/v2/cars?min_price=&max_price=&min_mileage=&max_mileage=&min_year=&max_year=&is_certified=false&active_year=all&active_price=all&active_mileage=all${brandcars}&page[number]=${currentpage}&sort=&include=redbook-info.car-submodel.car-model.car-make,car-photos,wished-car,wisher`
    let results = await axios.get(endpoint)
    let carsbox = await axios.get('https://carmana.com/api/v2/car-makes')
    let carsboxdetail = await axios.get(`https://carmana.com/api/v2/car-models?car_make_id=${carsboxdetailid}`)

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




    // const redbookid = results.data.data?.map(x => {
    //   const redbookids = x.relationships?.['redbook-info']?.data?.id
    //   return redbookids
    // })


    // console.log(redbookid)

    // const year_cars = results.data.included?.map(x => {
    //   const year = x.id
    //   return year
    // })
    // console.log(year_cars)


    // const yeardata = results.data.included?.map(x => {
    //   const year = x.attributes?.['year-group']
    //   return year 
    // })
    // console.log(yeardata)









    //pagination 
    var countpage = results.data.meta.page?.['total-pages']
    var num; var pages = ["1"];
    for (num = 2; num <= countpage; num++) {
      pages.push(num)
    }

    //load view
    return view.render('pages/cars', {
      cars: cars,
      carsbox: carsbox.data.data,
      carsboxdetail: carsboxdetail.data.data,
      count_cars: results.data.meta.page?.['total-count'],
      pages: pages
      // redbookid: redbookid,
      // year_cars: year_cars,
      // yeardata: yeardata
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
