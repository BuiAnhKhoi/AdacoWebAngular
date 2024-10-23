import {Request, Response} from 'express'

import { checkLogin, addNewUser, checkDataExistsRegister, getInformationByID } from '../models/users'
import { generateToken } from './handleJWT'

const checkLoginAccount = (req : Request, res : Response) => {
    const {username, password} = req.body
    
    try{
        checkLogin(username, password).then((result)=> {
            if (result['hasError'] === true){
                // TODO : update code in the future
            }else {
                if(result['idUser'] === null){
                    res.status(201).json({result : 'not-found', error:false})
                }else {
                    let createToken:string = generateToken({
                        username:username
                    })
                    res.status(201).json({result: 'exists', error: false, token : createToken, idUser : result['idUser']})
                }
            }
        })
    }catch(error){
        // Update code in the future
        res.status(400).json({result:false, error:true})
    }

}

const createUser = (req: Request, res: Response) => {
    const { get_username, get_password, get_tel, get_gmail, get_firstname, get_lastname, get_avatar, get_dob} = req.body 
    try {
        addNewUser(get_username, get_password, get_tel, get_gmail, get_firstname, get_lastname, get_avatar, get_dob).then((result) => {
            if(result['hasError'] === true){
                // TODO : update code in the future
                res.status(400).json({result:false, error: true})
            }else {
                res.status(201).json({result:true, error:false, username : result['username']})
            }
        })

    }catch(error){
        // Update code in the future
        res.status(400).json({result:false, error: true})
    }

}

const checkDataUserExists = (req : Request, res : Response) => {
    const {get_username, get_tel, get_gmail} = req.body 
    try{
        checkDataExistsRegister(get_username, get_tel, get_gmail).then((result) => {
            res.status(201).json({'result' : result, error: false})
        }).catch((error) => {
            res.status(400).json({'result': false, error: true})
        })
    }catch(error){
        res.status(400).json({result:false, error: true})
    }
}

const getInformationUserByIDController = (req : Request, res : Response) => {
    const {id_user} = req.query
    try{
        getInformationByID(id_user).then((result) => {
            if(result['hasError'] === true){
                // TODO : update code in the future
                res.status(400).json({result:false, error: true})
            }else {
                res.status(201).json({'result': result['result'], error:false})
            }
        })
    }catch(error){
        res.status(400).json({result:false, error: true})
    }
}

export { checkLoginAccount, createUser, checkDataUserExists, getInformationUserByIDController }