import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
const axios = require('axios')

export default class CarsController {

  private searchIncudData(included: any[], id: any, type: any){
    return included.find(i => i.id == id && i.type == type)
  }



  public async cars({ request, view }: HttpContextContract) {
    
    //id ของ page
    const currentpage = request.input('page', 1)
    // console.log(currentpage)

    //id ของกล่องช้างๆ
    const carsboxdetailid = request.input('carsboxdetailid', 1)
    
    //กรองยี่ห้อรถ
    const grong = request.input('carBrandAndModel', "")
    // console.log(grong)
    const brandcars =  grong ? `&car_make[]=${grong}` : ''
    // console.log(brandcars)

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


    const includedData = results.data.data?.map(car => {
      Object.keys(car?.relationships).map(rKey => {
        let relationships = car?.relationships[rKey]
        if (typeof relationships.data == 'object'){
          relationships.data.include = this.searchIncudData(results.data.included, relationships.data.id, relationships.data.type)

        }else if (Array.isArray(relationships.data)){
          relationships.data?.map(r => {
            r.include = this.searchIncudData(results.data.included, r.id, r.type)
          })
        }
      })
    })
    // console.log('includedData', JSON.stringify(results.data.data[0], null, 2))
    // console.log(includedData)
    const alldata = results.data.data
    


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
      pages: pages,
      alldata: alldata  
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
