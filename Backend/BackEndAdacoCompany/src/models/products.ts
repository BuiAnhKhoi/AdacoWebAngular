import { AppDataSource } from '../data-source'
import { products } from '../entity/products' 
import { product_img } from '../entity/product_img'

async function getProduct(strFilter:any, currentPage:any):Promise<{[key:string] : boolean|string|number|products[]}> {
    try{
        const productEachPage:number = 6
        let orderBy:{[key:string] : string} = {}

        if(strFilter === 'price-lth'){
            orderBy = {'price' : 'ASC'};
        }else if(strFilter === 'price-htl'){
            orderBy = {'price': 'DESC'}
        }

        const productRepository = AppDataSource.getRepository(products);
        const totalRows = await productRepository.count()
        const numPage = Math.ceil(totalRows/ productEachPage)

        if(currentPage>numPage){
            currentPage = numPage
        }

        const getProducts = await productRepository.find({
            order:orderBy,
            take: productEachPage,
            skip:productEachPage * (currentPage - 1)
        })

        return{
            'total_row': totalRows,
            'num_page':numPage,
            'products': getProducts,
            'hasError' : false
        }
    }catch(error){
        return {'hasError' : true, 'detailError': error.message}
    }
}

async function getDetailProductById(idProduct:any):Promise<{[key:string] : boolean|string|number|products}> {
    try{
        const productRepository = AppDataSource.getRepository(products)
        const detailProduct = await productRepository.createQueryBuilder('product').leftJoinAndSelect('product.images', 'product_img').where("product.id = :id",{ id : idProduct}).getOne()

        if (!detailProduct){
            return {'hasError': false, 'result' : 'not-found'}
        }

        return {'hasError' : false, 'result' : detailProduct}
    }catch(error){
        return {'hasError' : true, 'detailError' : error.message}
    }
}

async function getDetailProductByIDWithoutImage(idProduct:any):Promise<{[key:string] : boolean|string|number|products}> {
    try{
        const productRepository = AppDataSource.getRepository(products)
        const detailProduct = await productRepository.createQueryBuilder('product').where('product.id = :id', {id : idProduct}).getOne()

        if (!detailProduct){
            return {'hasError': false, 'result' : 'not-found'}
        }

        return {'hasError' : false, 'result' : detailProduct}
    }catch(error){
        return {'hasError' : true, 'detailError' : error.message}
    }
}

export { getProduct, getDetailProductById, getDetailProductByIDWithoutImage }
