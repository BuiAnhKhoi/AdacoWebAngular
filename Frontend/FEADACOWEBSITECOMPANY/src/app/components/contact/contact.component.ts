import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Import validator
import { gmailValidator } from '../../validators/gmail.validator'

// Import service
import { CallApiService } from '../../services/call-api.service'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class CONTACTComponent implements OnInit {
  contactForm!: FormGroup;
  errorListString: Array<string> = [];
  sendSupportSuccessStatus: boolean = false
  validationInputSupportStatus:boolean = false

  constructor(private formBuilder: FormBuilder,
    private callApiService: CallApiService
  ){}

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      fullNameContact: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(25),
        ],
      ],
      telContact: [
        '',
        [
          Validators.minLength(10),
          Validators.maxLength(12),
          Validators.required,
        ],
      ],
      gmailContact: ['', [Validators.required, gmailValidator()]],
      contentContact: [
        '',
        [
          Validators.minLength(1),
          Validators.maxLength(2000),
          Validators.required,
        ],
      ],
    });
  }

  checkErrorValidator(errValue: any, strNameField: string) {
    if (errValue !== null) {
      for (let eachErrStr in errValue) {
        switch (eachErrStr) {
          case 'required':
            this.errorListString.push(`${strNameField} ${eachErrStr}`);
            break;
          case 'minlength':
            this.errorListString.push(
              `${strNameField} at least ${errValue[eachErrStr]['requiredLength']} character`
            );
            break;
          case 'maxlength':
            this.errorListString.push(
              `${strNameField} at max ${errValue[eachErrStr]['requiredLength']} character`
            );
            break;
          case 'invalidGmail':
            this.errorListString.push(`${strNameField} have type @gmail.com`);
            break;
          default:
            this.errorListString.push('Unknown error');
        }
      }
    }
  }

  onSubmitContact() {
    this.errorListString = [];
    this.validationInputSupportStatus = false
    this.sendSupportSuccessStatus = false

    let controlsAllForm = this.contactForm.controls;

    for (let each_control in controlsAllForm) {
      switch (each_control) {
        case 'fullNameContact':
          this.checkErrorValidator(
            controlsAllForm[each_control]['errors'],
            'Full name must : '
          );
          break;
        case 'telContact':
          this.checkErrorValidator(
            controlsAllForm[each_control]['errors'],
            'Telephone number must : '
          );
          break;
        case 'gmailContact':
          this.checkErrorValidator(
            controlsAllForm[each_control]['errors'],
            'Gmail must : '
          );
          break;
        case 'contentContact':
          this.checkErrorValidator(
            controlsAllForm[each_control]['errors'],
            'Content must : '
          );
          break;
        default:
          this.checkErrorValidator({ unknown: 'unknown' }, '');
      }
    }

    if (this.errorListString.length > 0) {
      // let summaryStrError: string = '';
      // this.errorListString.forEach((element, index) => {
      //   summaryStrError = summaryStrError + element;
      //   if (index < this.errorListString.length - 1) {
      //     summaryStrError = summaryStrError + '\n';
      //   }
      // });
      // this.showErrorValidationSupportForm(summaryStrError);
      this.validationInputSupportStatus = true
    }

    if (this.contactForm.valid === false) {
      // TODO : update code in the future
    } else {
      this.callApiService
        .addSupport({
          username: this.contactForm.get('fullNameContact')!.value,
          gmail: this.contactForm.get('gmailContact')!.value,
          tel: this.contactForm.get('telContact')!.value,
          content: this.contactForm.get('contentContact')!.value,
        })
        .subscribe({
          next: (data) => {
            if (data['hasError'] === false) {
              if (data['result'] === true) {
                this.errorListString = [];
                let allControlForm = this.contactForm.controls;
                Object.keys(allControlForm).forEach((controlName) => {
                  allControlForm[controlName].setValue('');
                });
                this.sendSupportSuccessStatus = true
              } else {
                // TODO : update code in the future
              }
            } else {
              // TODO update code in the future
            }
          },
          error: (error) => {
            // TODO : update code in the future
          },
        });
    }
  }
}
