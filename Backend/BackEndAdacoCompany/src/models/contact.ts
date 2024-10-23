import { AppDataSource } from '../data-source'
import { get_support } from '../entity/get_support'

async function addContact(username:string, tel:string, gmail:string, content:string) {
    try{
        const contactRepository = AppDataSource.getRepository(get_support)

        const newContact = contactRepository.create({
            full_name: username,
            gmail: gmail,
            tel : tel,
            context : content,
            response : 'no',
        })

        await contactRepository.save(newContact)

        return {'hasError' : false, 'result' : true}
    }   catch(error){
        return {'hasError' : true, 'detailError' : error.message}
    } 
}

export { addContact }