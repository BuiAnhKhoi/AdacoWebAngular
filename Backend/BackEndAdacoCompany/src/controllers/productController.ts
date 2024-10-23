import {Request, Response} from 'express'

import { getProduct, getDetailProductById, getDetailProductByIDWithoutImage } from '../models/products'

const getAllProduct = (req:Request, res:Response) => {
    // TODO here check in getProduct function, if set filter is string  type => error
    const {filter, current_page} = req.query

    try{
        getProduct(filter, current_page).then((result) =>{
            if(result['hasError'] === true){
                // TODO update code in the future
                res.status(400).json({'error' : true})
            }else {
                res.status(201).json(result)
            }
        })


    }catch(error){
        res.status(400).json({'error': true, 'detailError': error.message})
    }
}

const getProductById = (req: Request, res : Response) =>{
    const { id_product } = req.query 
    try{
        getDetailProductById(id_product).then((result)=> {
            if(result['hasError'] === true){
                // TODO : update code in the future
                res.status(400).json({'result' : false, 'error': true})
            }else {
                res.status(201).json({'result' : [result['result']], 'error' : false})
                
            }
            
        })
    }catch(error){
        res.status(400).json({
            result: false,
            error: true
        })
    }
}

const getDetailProductWithIDWithoutImage = (req: Request, res : Response) => {
    const { id_product } = req.query;
    try{
        getDetailProductByIDWithoutImage(id_product).then((result)=> {
            if(result['hasError'] === true){
                // TODO : update code in the future
                res.status(400).json({'result' : false, 'error': true})
            }else {
                res.status(201).json({'result' : result['result'], 'error' : false})
                
            }
        })
    }catch(error){
        res.status(400).json({
            result: false,
            error: true
        })
    }
}
export { getAllProduct, getProductById, getDetailProductWithIDWithoutImage }
