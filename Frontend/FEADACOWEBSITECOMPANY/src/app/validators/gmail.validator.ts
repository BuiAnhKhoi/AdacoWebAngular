import { AbstractControl, ValidatorFn} from '@angular/forms'

export function gmailValidator(): ValidatorFn {
    return (control : AbstractControl): {[key:string] : any} | null => {
        const gmail :string = control.value;
        if(gmail && !gmail.endsWith('@gmail.com')){
            return {'invalidGmail' : true}
        }
        return null
    }
}