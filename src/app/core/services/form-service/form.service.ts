import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validator, ReactiveFormsModule } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  validate(form:FormGroup) {
    return form.invalid ? null : form.value;
  }
}
