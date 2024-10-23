import { Request, Response } from "express";

import { orderBuyNow, makeOrderFromCart, searchOrderByCode, getOrderHistory, getOrderStatus} from '../models/order'

const orderBuyNowController = (req: Request, res: Response) => {
    const {
        totalCost,
        shippingFee,
        priceProduct,
        note,
        province,
        district,
        ward,
        fullNameBuyer,
        telBuyer,
        quantityOrder,
        idProduct,
      } = req.body;
    try{
        orderBuyNow(totalCost,
            shippingFee,
            priceProduct,
            note,
            province,
            district,
            ward,
            fullNameBuyer,
            telBuyer,
            quantityOrder,
            idProduct).then((result)=>{
                
                if(result['hasError'] === true){
                    // TODO : update code in the future
                    res.status(400).json({result: false, error: true})
                }else {
                    res.status(201).json({'result': result['result'], error: false, 'codeNewOrder' : result['codeNewOrder']})
                }
            }).catch((error) => {res.status(400).json({ result: false, error: true })})
    }catch(error){
         // TODO : update code in the future
         res.status(400).json({result:false, error:true})
    }
}

const makeOrderFromCartController = (req : Request, res: Response) => {
    const {
        id_user,
        name_buyer,
        tel_buyer,
        province_buyer,
        district_buyer,
        ward_buyer,
        shipping_fee,
        note_buyer,
      } = req.body;
    try{
        // TODO: update code in the future, to check cart table empty or  not
        makeOrderFromCart(id_user, name_buyer, tel_buyer,
            province_buyer,
            district_buyer,
            ward_buyer,
            shipping_fee,
            note_buyer).then((result) =>{
                if(result['hasError'] === true){
                    
                    // TODO : update code in the future
                    res.status(400).json({result: false, error: true})
                }else {
                    res.status(201).json({'result': result['result'], error: false, 'codeOrder' : result['codeOrder']})
                }
            }).catch((error) => {res.status(400).json({ result: false, error: true });})   
    }catch(error){
         // TODO : update code in the future
         res.status(400).json({result:false, error:true})
    }
}

const searchOrderByCodeController = (req:Request, res: Response) => {
    const { code_order } = req.query;

    try{
        searchOrderByCode(code_order).then((result)=> {
            if(result['hasError'] === true){
                // TODO: update code in the future
                res.status(400).json({result: false, error: true})
            }else {
                res.status(201).json({error: false, 'result': result['result']})
            }
        }).catch((error) => {
            // TODO : update code in the future
         res.status(400).json({result:false, error:true})
        })
    }catch(error){
        res.status(400).json({result:false, error:error.message})
    }
}

const getOrderHistoryController = (req: Request, res: Response) => {
    const { str_filter, current_page } = req.query;
    try{
        getOrderHistory(str_filter, current_page).then((result)=> {
            if(result['hasError'] === true){
                // TODO : update code in the  future
                res.status(400).json({result:false, error:true})
            }else {
                res.status(201).json({error: false, 'result' : result['result']})
            }
        }).catch((error) => {
            res.status(400).json({result:false, error:error.message})
        })
    }catch(error){
        res.status(400).json({result:false, error:error.message})
    }
}

const getOrderStatusController = (req: Request, res: Response) => {
    const { str_status, current_page } = req.query;
    try{
        getOrderStatus(str_status, current_page).then((result) => {
            if(result['hasError'] === true){
                // TODO : update code in the  future
                res.status(400).json({result:false, error:true})
            }else {
                res.status(201).json({error: false, 'result' : result['result']})
            }
        }).catch((error) => {
            res.status(400).json({result:false, error:error.message})
        })
    }catch(error){
        res.status(400).json({result:false, error:error.message})
    }
}
export { orderBuyNowController, makeOrderFromCartController, searchOrderByCodeController, getOrderHistoryController, getOrderStatusController }