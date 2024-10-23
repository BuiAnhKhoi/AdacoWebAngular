import { AppDataSource } from '../data-source'
import { orders } from '../entity/orders'
import { division } from '../entity/division'
import { buyer } from '../entity/buyer'
import { product_order } from '../entity/product_order'
import { products } from '../entity/products'
import { cart } from '../entity/cart'

type orderOrderByType = "ASC" | "DESC"

async function orderBuyNow(totalCostPara:number,
    shippingFeePara:number,
    totalPriceProductPara:number,
    notePara:string,
    provincePara:string,
    districtPara:string,
    wardPara:string,
    fullNameBuyerPara:string,
    telBuyerPara:string,
    quantityOrderPara:number,
    idProductPara:products
):Promise<{[key:string] : boolean|string|number|orders[]}>{
    try{
        const orderRepository = AppDataSource.getRepository(orders)
        const queryRunner = AppDataSource.createQueryRunner()
        await queryRunner.startTransaction() 
        try{
            // Step 1 : get id division
            const getIdDivision = await AppDataSource.getRepository(division).createQueryBuilder('division').select('division.id').where('division.province = :province', {province :provincePara}).andWhere('division.district = :district', {district : districtPara}).andWhere('division.ward = :ward', {ward:wardPara}).getOne()
            
            if(!getIdDivision){
                // TODO: update code in the future
                return {'hasError' : true, 'result' : false, 'detailError': 'get-id-division-fail'}
            }

            // Step 2 : insert new buyer and get id
            const newBuyer = await AppDataSource.createQueryBuilder().insert().into(buyer).values({
                full_name: fullNameBuyerPara,
                tel: telBuyerPara
            }).returning('id').execute()

            const idBuyer = newBuyer.raw[0].id

            // Step 3 : insert new order and get id
            const newOrder = await AppDataSource.getRepository(orders).createQueryBuilder().insert().into(orders).values({
                date_create: () => 'NOW()',
                total_cost: totalCostPara,
                shipping_fee: shippingFeePara,
                total_price_product: totalPriceProductPara,
                note : notePara,
                id_division: getIdDivision,
                id_buyer: idBuyer,
                status: 'PENDING'
            }).returning(['id', 'code']).execute()

            const idOrder = newOrder.raw[0].id
            const codeNewOrder = newOrder.raw[0].code

            // Step 4 : Insert product order and get result
            const newOrderProduct = await AppDataSource.getRepository(product_order).createQueryBuilder().insert().into(product_order).values({
                id_order: idOrder,
                id_product: idProductPara,
                quantity: quantityOrderPara
            }).returning('*').execute()

            await queryRunner.commitTransaction()
            return {'hasError' : false, 'result' : true, 'codeNewOrder': codeNewOrder}

        }catch(error){
            
            await queryRunner.rollbackTransaction()
            return {'hasError': true, 'result': error.message}
        }finally{
            await queryRunner.release()
        }


    }catch(error){
        return {'hasError': true, 'detailError': error.message}
    }
}

async function makeOrderFromCart(idUserPara:number,
    nameBuyerPara:string, 
    telBuyerPara:string,
    provincePara:string,
    districtPara:string,
    wardPara:string,
    shippingFeePara:string,
    noteOrderPara:string
):Promise<{[key:string] : boolean|string|number|orders[]}> {
    try{
        const queryRunner = AppDataSource.createQueryRunner()
        await queryRunner.startTransaction()
        try {
            // Step 1 :
            const cartRepository = AppDataSource.getRepository(cart)
            const getTotalCost = await cartRepository.createQueryBuilder('cart').select(
                'SUM(quantity * CAST(price AS INTEGER)) + :shippingFee', 'total_cost'
            ).where('cart.id_user = :userId', { userId : idUserPara }).setParameter('shippingFee', shippingFeePara).getRawOne()

            const getIdDivision = await AppDataSource.getRepository(division).createQueryBuilder('division').select('division.id', 'id_division').where('division.province = :province',{ province : provincePara}).andWhere('division.district = :district', {district : districtPara}).andWhere("division.ward = :ward", {ward: wardPara}).getRawOne()

            if(!getIdDivision){
                return {'hasError': true, 'result' : 'can-not-get-id-division'}
            }
            const newBuyer = await AppDataSource.getRepository(buyer).createQueryBuilder('buyer').insert().into('buyer').values({
                full_name: nameBuyerPara,
                tel : telBuyerPara
            }).returning('id').execute()
            const idNewBuyer = newBuyer.raw[0].id

            const totalCostProduct = await AppDataSource.getRepository(cart).createQueryBuilder('cart').select('SUM(quantity * CAST(price AS INTEGER))', 'total_cost_product').where('cart.id_user = :idUser', {idUser : idUserPara}).getRawOne()

            const newOrder = await AppDataSource.getRepository(orders).createQueryBuilder('orders').insert().into('orders').values({
                date_create:() => 'NOW()',
                total_cost: getTotalCost['total_cost'],
                shipping_fee:shippingFeePara,
                total_price_product:totalCostProduct['total_cost_product'],
                note : noteOrderPara,
                id_division: getIdDivision['id_division'],
                id_buyer: idNewBuyer,
                status: 'PENDING'
            }).returning(['id', 'code']).execute()
            const idNewOrder = newOrder.raw[0].id
            const codeNewOrder = newOrder.raw[0].code

            const getAllCart = await AppDataSource.getRepository(cart).createQueryBuilder().from('cart', 'c').select(['c.quantity as quantity', 'c.id_product']).where('c.id_user = :idUser', {idUser : idUserPara}).distinct().getRawMany()

            let lstValueInsertNewOrderProduct = []
            for(let index in getAllCart){
                
                lstValueInsertNewOrderProduct.push({
                    id_order:idNewOrder,
                    id_product: getAllCart[index]['id_product'],
                    quantity: getAllCart[index]['quantity']
                })
            }

            const newOrderProduct = await AppDataSource.getRepository(product_order).createQueryBuilder('product_order').insert().into('product_order').values(lstValueInsertNewOrderProduct).execute()
           
            const deleteCartWithIdUser = await AppDataSource.getRepository(cart).createQueryBuilder('cart').delete().where('cart.id_user = :idUser',{idUser: idUserPara}).execute()

            // TODO: update code in the future to check if delete not success
        
            await queryRunner.commitTransaction()
            return {'hasError': false, 'result' : true, 'codeOrder' : codeNewOrder}
        }catch(error){
            await queryRunner.rollbackTransaction()
            
            return {'hasError': true, 'result' : error.message}
        }finally{
            await queryRunner.release()
        }

    }catch(error){
        return {'hasError': true, 'detailError': error.message}
    }
}

async function searchOrderByCode(codeOrder:any):Promise<{[key:string] : boolean|string|number|orders}> {
    try{
        const searchOrder = await AppDataSource.getRepository(orders).createQueryBuilder('orders').select('*').where('orders.code = :codeOrder', {codeOrder  : codeOrder}).getRawOne()
        // TODO  : check why getRawOne() is ok but if use getOne() return null ???
        
        if(searchOrder === undefined){
            // TODO : update code in the future
            // Wrong codeOrder, not exists in database
            return {'hasError' : false, 'result' : 'not-found'}
        }
        return {'hasError' : false, 'result' : searchOrder}
    }catch(error){
        return {'hasError': true, 'detailError': error.message}
    }
}

async function getOrderHistory(strFilter:any, currentPage :any) {
    try{
        // Each for navigation per page
        let orderEachPage = 10;

        let sortOrderBy:string = "id"
        let orderOrderBy:orderOrderByType = "ASC"
        
        if (strFilter === "tchtl") {
        sortOrderBy = "total_cost"
        orderOrderBy = "DESC"
        } else if (strFilter === "tclth") {
        sortOrderBy = "total_cost"
        orderOrderBy = "ASC"
        } else if (strFilter === "newest") {
        sortOrderBy = "date_create"
        orderOrderBy = "DESC"
        } else if (strFilter === "oldest") {
        sortOrderBy = "date_create"
        orderOrderBy = "ASC"
        }

        const rowInfo = await AppDataSource.createQueryBuilder().select('COUNT(*)', 'total_row').from('orders', 'o').getRawOne()
        const paginationInfo = Math.ceil(parseInt(rowInfo['total_row']) / orderEachPage)

        if(currentPage > paginationInfo){
            // TODO : update code in the future, to check if the current page > pagination info
        }

        const startIndex = (parseInt(currentPage) -1 )* orderEachPage

        const getOrder = await AppDataSource.getRepository(orders).createQueryBuilder('orders').select('*').orderBy(sortOrderBy, orderOrderBy).limit(orderEachPage).offset(startIndex).getRawMany()

        return {'hasError' : false, 'result' : {
            'total_row' : rowInfo['total_row'],
            'num_page': paginationInfo,
            'lst_order' : getOrder
        }}
    }catch(error){
        console.log(error.message)
        return {'hasError': true, 'detailError': error.message}
    }
}

async function getOrderStatus(strStatus:any, currentPage:any) {
    try{
        // Each for navigation per page
        let orderEachPage = 10;

        const rowInfo = await AppDataSource.createQueryBuilder().select('COUNT(*)', 'total_row').from('orders', 'o').where('o.status = :strStatus', {strStatus}).getRawOne()
        const paginationInfo = Math.ceil(parseInt(rowInfo['total_row']) / orderEachPage)
        
        if(currentPage > paginationInfo){
            // TODO : update code in the future, to check if the current page > pagination info
        }

        const startIndex = (parseInt(currentPage) -1 )* orderEachPage

        const getOrder = await AppDataSource.getRepository(orders).createQueryBuilder('orders').select('*').where('orders.status = :strStatus', {strStatus}).orderBy('orders.id').limit(orderEachPage).offset(startIndex).getRawMany()
        
        return {'hasError' : false, 'result' : {
            'total_row' : rowInfo['total_row'],
            'num_page': paginationInfo,
            'lst_order': getOrder
        }}
    }catch(error){
        return {'hasError': true, 'detailError': error.message}
    }
}
export { orderBuyNow, makeOrderFromCart, searchOrderByCode, getOrderHistory, getOrderStatus}