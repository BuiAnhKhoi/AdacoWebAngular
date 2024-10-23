import { AppDataSource } from '../data-source'
import { auth_user } from '../entity/auth_user'

async function checkLogin(username:any, password:any ):Promise<{[key:string] : boolean|string|number}> {
    try {
        const userRepository = AppDataSource.getRepository(auth_user)

        const getUser = await userRepository.findOne({
            where: {
                username,
                password
            }
        })
        if (getUser === null){
            // Check if username or password false, so we can't get any user so getUser will return null, so that why idUser is null
            return {'hasError' : false, 'idUser' : null}
        }else {
            return {'hasError' : false, 'idUser' : getUser['id']}
        }
    }catch(error){
        return {'hasError': true, 'detailError': error.message}
    }
}

async function addNewUser(username:string, password:string, tel:string, gmail:string, firstName: string, lastName:string, avatarLink:string, dobUser:string):Promise<{[key:string] : boolean|string|number}> {
    try{
        if (avatarLink === ""){
            avatarLink = 'avatar_users/default_avatar.png'
        }

        const userRepository = AppDataSource.getRepository(auth_user)
        const newUser = userRepository.create({
            password,
            username,
            first_name : firstName,
            last_name : lastName,
            gmail : gmail,
            tel : tel,
            avatar : avatarLink,
            dob : dobUser
        });

        await userRepository.save(newUser)

        return {'hasError' : false, 'username' : newUser['username']}
    }catch(error){
        return {'hasError': true, 'detailError' : error.message}
    }
}

async function checkDataExistsRegister(username:string, tel:string, gmail:string):Promise<{[key:string] : boolean|string|number}>{
    try{
        const userRepository = AppDataSource.getRepository(auth_user)

        const usernameExists = await userRepository.createQueryBuilder('user').where('user.username = :username', {username}).getOne()
        const telExists = await userRepository.createQueryBuilder('user').where('user.tel = :tel', { tel}).getOne()
        const gmailExists = await userRepository.createQueryBuilder('user').where('user.gmail = :gmail', { gmail})

        return {
            username :usernameExists ? "Invalid" : 'Valid',
            tel : telExists ? 'Invalid' : 'Valid',
            gmail : gmailExists ? 'Invalid' : 'Valid'
        }
    }catch(error){
        return {'hasError' : true, 'detailError': error.message}
    }
}

async function getInformationByID(idUser:any):Promise<{[key:string] : boolean|string|number|auth_user}> {
    try{
        const userRepository = AppDataSource.getRepository(auth_user)

        const getInformation = await userRepository.createQueryBuilder('auth_user').select([
            'auth_user.id',
            'auth_user.last_login',
            'auth_user.username',
            'auth_user.gmail',
            'auth_user.first_name',
            'auth_user.last_name',
            'auth_user.tel',
            'auth_user.date_joined',
            'auth_user.dob',
            'auth_user.avatar'
        ]).where('auth_user.id = :id', {id : idUser}).getOne()

        return {'hasError' : false, 'result' : getInformation}
    }catch(error){
        return {'hasError' : true, 'detailError': error.message}
    }
}

export {checkLogin, addNewUser, checkDataExistsRegister, getInformationByID}