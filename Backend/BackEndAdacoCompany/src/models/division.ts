import { AppDataSource } from '../data-source'
import { division } from '../entity/division'

async function loadAllProvince() {
    try{
        const divisionRepository = AppDataSource.getRepository(division)
        
        const getAllProvince = await divisionRepository.createQueryBuilder('division').select('division.province').distinct(true).getRawMany()

        return {'hasError': false, 'result' : getAllProvince}
    }catch(error){
        return {'hasError' : true, 'detailError' : error.message}}
}

async function loadAllDistrict(strProvince:any) {
    try{
        const divisionRepository = AppDataSource.getRepository(division)

        const getAllDistrict = await divisionRepository.createQueryBuilder('division').select('DISTINCT division.district').where('division.province = :province', {province : strProvince}).getRawMany()

        return {'hasError': false, 'result' : getAllDistrict}
    }catch(error){
        console.log(error.message)
        return {'hasError' : true, 'detailError' : error.message}}
}

async function loadAllWard(strProvince:any, strDistrict : any) {
    try{
        const divisionRepository = AppDataSource.getRepository(division)

        const getAllWard = await divisionRepository.createQueryBuilder('division').select('DISTINCT division.ward').where('division.province = :province', {province : strProvince}).andWhere('division.district = :district', {district : strDistrict}).getRawMany()

        return {'hasError': false, 'result' : getAllWard}
    }catch(error){
        return {'hasError' : true, 'detailError' : error.message}}
}

export { loadAllProvince, loadAllDistrict,loadAllWard }