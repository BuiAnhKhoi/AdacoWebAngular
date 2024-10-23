import { Request, Response } from "express";

import { getQuantityInCartByID, addOneProductToCart, getAllProductInCart, deleteProductInCart, addQuantityProductInCart, minusQuantityProductInCart, inputQuantityProductInCart, addMoreQuantityProductInCart } from '../models/cart'
import { error } from "console";

const getQuantityInCartByIDController = (req :Request, res :Response) => {
    const { id_user } = req.body
    try{
        getQuantityInCartByID(id_user).then((result)=>{
            if(result['hasError'] === true){
                // TODO : update code in the future
                res.status(400).json({result: false, error: true})
            }else {
                res.status(201).json({'result': result['result'].length, error: false})
            }
        })
    }catch(error){
        // TODO : update code in the future
        res.status(400).json({result:false, error:true})
    }
}

const addOneProductToCartController = (req: Request, res: Response) => {
    const { id_user, id_product, price_per_product } = req.body;
    try {
        addOneProductToCart(id_product, id_user, price_per_product).then((result) =>{
            if(result['hasError'] === true){
                // TODO : update code in the future
                res.status(400).json({result: false, error: true})
            }else {
                res.status(201).json({'result' : result['result'], error : false})
            }
        })
    }catch(error){
        // TODO : update code in the future
        res.status(400).json({result:false, error:true})
    }
}

const getAllProductInCartController = (req: Request, res: Response) => {
    const { id_user } = req.query;
    try {
        getAllProductInCart(id_user).then((result) => {
            if(result['hasError'] === true){
                // TODO : update code in the future
                res.status(400).json({result: false, error: true})
            }else {
                res.status(201).json({'result' : result['result'], error: false})
            }
        })
    }catch(error){
        // TODO : update code in the future
        res.status(400).json({result:false, error:true})
    }
}

const deleteProductInCartController = (req: Request, res: Response) => {
    const {id_user, id_product} = req.body 
    try{
        deleteProductInCart(id_user, id_product).then((result)=>{
            if(result['hasError'] === true){
                // TODO : update code in the future
                res.status(400).json({result: false, error: true})
            }else {
                res.status(201).json({'result' : result['result'], error: false})
            }
        })
    }catch(error){
        // TODO : update code in the future
        res.status(400).json({result:false, error:true})
    }
}

const addQuantityProductInCartController = (req: Request, res: Response) => {
    const {id_user, id_product} = req.body 
    try{
        addQuantityProductInCart(id_user,  id_product).then((result) =>{
            if(result['hasError'] === true){
                // TODO : update code in the future
                res.status(400).json({result: false, error: true})
            }else {
                res.status(201).json({'result': result['result'], error : false})
            }
        })
    }catch(error){
        // TODO : update code in the future
        res.status(400).json({result:false, error:true})
    }
}

const minusQuantityProductInCartController = (req: Request, res: Response) => {
    const {id_user, id_product} = req.body 
    try{
        minusQuantityProductInCart(id_user, id_product).then((result) => {
            if(result['hasError'] === true){
                // TODO : update code in the future
                res.status(400).json({result: false, error: true})
            }else {
                res.status(201).json({'result' : result['result'], error : false})
            }
        })
    }catch(error){
        // TODO : update code in the future
        res.status(400).json({result:false, error:true})
    }
}

const inputQuantityProductInCartController = (req: Request, res: Response) => {
    const {id_user, id_product, input_quantity} = req.body 
    try{
        inputQuantityProductInCart(id_user, id_product, input_quantity).then((result) => {
            if(result['hasError'] === true){
                // TODO : update code in the future
                res.status(400).json({result: false, error: true})
            }else {
                res.status(201).json({'result' : result['result'], error: false})
            }

        })
    }catch(error){
        // TODO : update code in the future
        res.status(400).json({result:false, error:true})
    }
}

const addMoreQuantityProductInCartController = (req: Request, res: Response) => {
    const { id_user, id_product, price_per_product, quantity_add } = req.body;
    try{
        addMoreQuantityProductInCart(id_product, id_user, price_per_product, quantity_add).then((result)=> {
            if(result['hasError'] === true){
                // TODO : update code in the future
                res.status(400).json({result: false, error: true})
            }else {
                res.status(201).json({'result': result['result'], error:false})
            }
        })
    }catch(error){
        // TODO : update code in the future
        res.status(400).json({result:false, error:true})
    }
}

export { getQuantityInCartByIDController, addOneProductToCartController, getAllProductInCartController, deleteProductInCartController, addQuantityProductInCartController, minusQuantityProductInCartController, inputQuantityProductInCartController, addMoreQuantityProductInCartController}