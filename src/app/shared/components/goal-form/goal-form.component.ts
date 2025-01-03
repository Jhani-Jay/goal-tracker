import { Component, output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

// third party libraries
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

// local imports
import { AppService } from '@core/services/app-service/app.service';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core/model/AppState.model';
import { onPostGoal } from '@app/core/state/goal.action';
import { generateId } from '@app/shared/utils/uuid';

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
    private fb: FormBuilder,
    private store: Store<AppState>,
    private appSerivce: AppService,
  ) {
    this.createForm();
  };

  get milestones() {
    return this.goalForm.get('milestones') as FormArray;
  }

  createForm() {
    this.goalForm = this.fb.group({
      goal: ['', Validators.required],
      milestones: this.fb.array([this.createControl()]),
    })
  }

  createControl() {
    return this.fb.group({
      name: ['', Validators.required]
    })
  }

  addComment() {
    this.milestones.push(this.createControl());
  }

  removeComment(index: number) {
    this.milestones.removeAt(index);
  }

  onSubmit() {
    const form = this.goalForm;
    // this.visible = false;
    if (form.invalid) {
      console.log('this form is invalid: ', form.value)
      return;
    }
    const goal = {id: generateId(), ...form.value};
    console.log('goal: ', goal);
    this.store.dispatch(onPostGoal({goal}))
     this.visible = false;
  }

  hideDialog() {
    this.appSerivce.hideDialog();
    this.appSerivce.isEdit.set(false);
    this.close.emit(false);
  }
  
}
