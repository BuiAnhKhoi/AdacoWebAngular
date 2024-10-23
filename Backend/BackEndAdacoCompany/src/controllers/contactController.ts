import { Request, Response } from "express";
import { addContact } from '../models/contact'

const addNewContact = (req : Request, res: Response) => {
    const {username, tel, gmail, content} = req.body 
    try{
        addContact(username, tel, gmail, content).then((result) => {
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

export { addNewContact }