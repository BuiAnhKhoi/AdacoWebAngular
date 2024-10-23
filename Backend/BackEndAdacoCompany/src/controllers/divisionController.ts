import { Request, Response } from "express";
import { loadAllProvince, loadAllDistrict, loadAllWard } from '../models/division'

const allProvince = (req : Request, res: Response) => {
    try{
        loadAllProvince().then((result) => {
            if(result['hasError'] === true){
                // TODO : update code in the future
                res.status(400).json({result: false, error: true})
            }else {
                res.status(201).json(result)
            }
        })
    }catch(error){
        // TODO : update code in the future
        res.status(400).json({result:false, error:true})
    }
}

const allDistrict = (req : Request, res: Response) => {
    const { province } = req.query
    try{
        loadAllDistrict(province).then((result) => {
            if(result['hasError'] === true){
                // TODO : update code in the future
                res.status(400).json({result: false, error: true})
            }else {
                res.status(201).json(result)
            }
        })
    }catch(error){
        // TODO : update code in the future
        res.status(400).json({result:false, error:true})
    }
}

const allWard = (req : Request, res: Response) => {
    const { province, district } = req.query
    try{
        loadAllWard(province, district).then((result) => {
            if(result['hasError'] === true){
                // TODO : update code in the future
                res.status(400).json({result: false, error: true})
            }else {
                res.status(201).json(result)
            }
        })
    }catch(error){
        // TODO : update code in the future
        res.status(400).json({result:false, error:true})
    }
}

export { allProvince, allDistrict, allWard}