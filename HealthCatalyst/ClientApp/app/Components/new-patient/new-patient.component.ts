import { Patient } from './../../Models/Patient';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.css']
})
export class NewPatientComponent implements OnInit {

  @Output() onsubmit: EventEmitter<Patient> = new EventEmitter();
  @Output() oncancel: EventEmitter<any> = new EventEmitter();

  public newPatientform: FormGroup;
  private capturedImage: string;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.newPatientform = this.fb.group({
      FirstName: ['', [Validators.required, Validators.minLength(1)]],
      LastName: ['', [Validators.required, Validators.minLength(1)]],
      Age: [, [Validators.required, Validators.min(18)]],
      DOB: ['', [ Validators.required, Validators.pattern('^(19|20)\\d\\d([- /.])(0[1-9]|1[012])\\2(0[1-9]|[12][0-9]|3[01])$')]],
      Gender: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      Zip: ['', [Validators.required]],
      Country: ['',[Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      Phone: ['', [Validators.required, Validators.minLength(10), Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')]],
      Interest: [''],
      Characteristics: [''],
      Image: ['', [Validators.required, Validators.minLength(1)]]
    });

    this.newPatientform.reset();
  }

  public submit(event: any) {
    if (this.newPatientform.valid)
    {

      const value = this.newPatientform.value;

      this.onsubmit.emit({
        FirstName: value.FirstName,
        LastName: value.LastName,
        Age: value.Age,
        DOB: value.DOB,
        Gender: value.Gender,
        Communication: {
          Address: value.Address,
          Zip: value.Zip,
          Country: value.Country,
          Email: value.Email,
          Phone: value.Phone
        },
        Description: {
          Characteristics: value.Characteristics,
          Interest: value.Interest
        },
        Image: {
          ImageCodeBase64: this.capturedImage
        }
      })
    }
    
  }

  public cancel() {
    this.oncancel.emit();
  }

  public processFile = ($event: any): void => {
    const reader = new FileReader();
    reader.readAsBinaryString($event.target.files[0]);
    reader.onload = (e) =>  {
      this.capturedImage = btoa(reader.result.toString())
    };
  }
}
