import { Component, output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

// third party libraries
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

// local imports
import { AppService } from '@core/services/app-service/app.service';

@Component({
  selector: 'app-goal-form',
  standalone: true,
  imports: [ReactiveFormsModule, DialogModule, ButtonModule, InputTextModule],
  templateUrl: './goal-form.component.html',
  styleUrl: './goal-form.component.scss'
})
export class GoalFormComponent {
  goalForm!: FormGroup;
  visible: boolean = true;
  close = output<boolean>();
  isEdit = this.appSerivce.isEdit;

  constructor(
    private appSerivce: AppService,
    private fb: FormBuilder,
  ) {
    this.createForm();
  };

  get comments() {
    return this.goalForm.get('comments') as FormArray;
  }

  createForm() {
    this.goalForm = this.fb.group({
      title: ['', Validators.required],
      comments: this.fb.array([['', Validators.required]]),
    })
  }

  addComment() {
    this.comments.push(this.fb.control('', Validators.required));
  }

  removeComment(index: number) {
    this.comments.removeAt(index);
  }

  hideDialog() {
    this.appSerivce.hideDialog();
    this.appSerivce.isEdit.set(false);
    this.close.emit(false);
  }
  
}
