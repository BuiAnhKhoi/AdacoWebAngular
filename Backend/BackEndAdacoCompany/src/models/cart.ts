import { AppDataSource } from '../data-source'
import { cart } from '../entity/cart'
import { auth_user } from '../entity/auth_user'
import { products } from '../entity/products'

async function getQuantityInCartByID(idUser:number) {
    try{
        const cartRepository = AppDataSource.getRepository(cart)
        const getQuantityInCart = await cartRepository.createQueryBuilder('cart').where('cart.id_user = :id', {id: idUser}).getMany();

        return {'hasError': false, 'result': getQuantityInCart}
    }catch(error){
        return {'hasError' : true, 'detailError' : error.message}
    }
}

async function addOneProductToCart(idProduct: products, idUser: auth_user , pricePerProduct:string) {
    try{
        const cartRepository = AppDataSource.getRepository(cart)

        const existingCartItem = await cartRepository.createQueryBuilder('cart').select(['COUNT(*) as cart_count', 'MAX(cart.price) as cart_price']).where('cart.id_user = :idUser', {idUser}).andWhere('cart.id_product = :idProduct', { idProduct }).getRawOne();

        const cartCount = parseInt(existingCartItem.cart_count, 10)
        const cartPrice = parseInt(existingCartItem.cart_price, 10)

        if(cartCount === 1){
            if(cartPrice !== parseInt(pricePerProduct)){
                // TODO : update code in the future
                return {}
            }else {
                await cartRepository.createQueryBuilder().update(cart).set({ quantity:() => 'quantity + 1'}).where('id_user = :idUser', {idUser}).andWhere('id_product = :idProduct', {idProduct}).execute();

                return {'hasError' : false, 'result' : 'update'}
            }
        }else {
            const newCartItem = new cart()
            
            newCartItem.id_user = idUser
            newCartItem.id_product = idProduct
            newCartItem.quantity = 1
            newCartItem.price = pricePerProduct

            await cartRepository.save(newCartItem)

            return {'hasError' : false, 'result' : 'new'}
        }

    }catch(error){
        return {'hasError' : true, 'detailError' : error.message}
    }
}

async function getAllProductInCart(idUser:any) {
    try{
        const cartRepository = AppDataSource.getRepository(cart)

        const allProduct = await cartRepository.createQueryBuilder('c').innerJoinAndSelect('c.id_product', 'product').innerJoinAndSelect('c.id_user', 'user').select(['c.id',
        'user.id',
        'product.id',
        'c.quantity',
        'c.price',
        'product.img_main',
        'product.name']).where('c.id_user = :idUser', {idUser}).orderBy('c.id').getMany()

        
        return {'hasError' : false, 'result' : allProduct}
    }catch(error){
        return {'hasError' : true, 'detailError' : error.message}
    }
}

async function deleteProductInCart(idUser:number, idProduct:number) {
    try{
        const cartRepository = AppDataSource.getRepository(cart)

        const deleteProduct = await cartRepository.createQueryBuilder('cart').delete().from(cart).where('id_user = :idUser AND id_product = :idProduct', {idUser, idProduct}).returning('*').execute()

        // TODO : update code in the future
        // 
        if(deleteProduct['affected'] === 1){
            return {'hasError' : false, 'result' : true}    
        }else {
            // Update code in the future
            return {'hasError' : false, 'result' : false}
         }
        
    }catch(error){
        return {'hasError' : true, 'detailError' : error.message}
    }
}

async function addQuantityProductInCart(idUser:number, idProduct:number) {
    try{
        const cartRepository = AppDataSource.getRepository(cart)

        const updateResult = await cartRepository.createQueryBuilder('cart').update(cart).set({
            quantity:() => "quantity + 1"
        }).where('id_user = :idUser AND id_product = :idProduct', {idUser, idProduct}).execute()

        // TODO : update code in the future, to check quantity in inventory, it will update code in the future
        if(updateResult['affected'] === 1){
            return {'hasError' : false, 'result' : true}
        }
        return {'hasError' : false, 'result' : false}
    }catch(error){
        return {'hasError' : true, 'detailError' : error.message}
    }
}

async function minusQuantityProductInCart(idUser:number, idProduct:number) {
    try{
        const cartRepository = AppDataSource.getRepository(cart)

        const updateResult = await cartRepository.createQueryBuilder('cart').update(cart).set({
            quantity:() => "quantity - 1"
        }).where('id_user = :idUser AND id_product = :idProduct', {idUser, idProduct}).execute()

        // TODO  : update code in the future to make, if quantity > 1, can't minus throw error
        if(updateResult['affected'] === 1){
            return {'hasError' : false, 'result' : true}
        }
        return {'hasError' : false, 'result' : false}
    }catch(error){
        return {'hasError' : true, 'detailError' : error.message}
    }
}

async function inputQuantityProductInCart(idUser:number, idProduct:number, inputQuantity: number) {
    try{
        const cartRepository = AppDataSource.getRepository(cart)

        const updateResult = await cartRepository.createQueryBuilder('cart').update(cart).set({quantity: inputQuantity}).where('id_user = :idUser AND id_product = :idProduct', {idUser, idProduct}).execute()
        
        // TODO : update code in the future, to check a quantity >= quantity in inventory
        if(updateResult['affected'] === 1){
            return {'hasError' : false, 'result' : true}    
        }
        return {'hasError' : false, 'result' : false}
    }  catch(error){
        return {'hasError' : true, 'detailError' : error.message}
    }  
}

async function addMoreQuantityProductInCart(idProduct:products, idUser:auth_user, pricePerProduct:string, quantityAdd :number) {
    try{
        const cartRepository = AppDataSource.getRepository(cart)

        const queryRunner = AppDataSource.createQueryRunner()
        await queryRunner.startTransaction()
        try{
            const cartCount = await cartRepository.createQueryBuilder('cart').select('COUNT(*)', 'count').addSelect('MAX(price)', 'maxPrice').where('id_user = :idUser AND id_product = :idProduct', {idUser, idProduct}).getRawOne()

            const count = cartCount.count
            const maxPrice = cartCount.maxPrice
            
            if(parseInt(count) === 1){
                if(parseInt(maxPrice) !== parseInt(pricePerProduct)){
                    // Update code in the future
                    return {'hasError' : true, 'result' : 'price-change'}
                }else {
                    await cartRepository.createQueryBuilder().update(cart).set({
                        quantity:() => `quantity + ${quantityAdd}`
                    }).where('id_user = :idUser AND id_product = :idProduct', {
                        idUser, idProduct
                    }).execute()

                }
            }else {
                await cartRepository.createQueryBuilder().insert().into(cart).values({
                    id_user:idUser,
                    id_product: idProduct,
                    quantity: quantityAdd,
                    price: pricePerProduct
                }).execute()
            }



            await queryRunner.commitTransaction()

            // TODO : update code in the future
            return {'hasError' : false, 'result': true}
        }catch(error){
            await queryRunner.rollbackTransaction()
            return {'hasError' : true, 'result': error.message}
        }finally{
          await queryRunner.release()
        }
    }catch(error){
        return {'hasError' : true, 'detailError' : error.message}
    }  
}

export { getQuantityInCartByID, addOneProductToCart, getAllProductInCart, deleteProductInCart, addQuantityProductInCart, minusQuantityProductInCart, inputQuantityProductInCart, addMoreQuantityProductInCart}