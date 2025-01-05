import { Component, OnInit, output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

// third party libraries
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

// local imports
import { AppService } from '@core/services/app-service/app.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core/model/AppState.model';
import { goal } from '@app/core/state/goal.selector';
import { take } from 'rxjs';
import { Goal, Milestone } from '@app/core/model/goal.model';
import { GoalTrackerService } from '@app/core/services/goal-tracker-service/goal-tracker.service';
import { FormService } from '@app/core/services/form-service/form.service';
import { onUpdateGoal } from '@app/core/state/goal.action';

@Component({
  selector: 'app-milestone-form',
  standalone: true,
  imports: [ReactiveFormsModule, DialogModule, ButtonModule, InputTextModule, DropdownModule],
  templateUrl: './milestone-form.component.html',
  styleUrl: './milestone-form.component.scss'
})
export class MilestoneFormComponent implements OnInit {
  milestoneForm!: FormGroup;
  visible: boolean = true;
  close = output<boolean>();
  isEdit = this.appSerivce.isEdit;
  milestone!: Milestone[] | undefined;
  selectedGoal!:Goal;
  
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private appSerivce: AppService,
    private goalTrackerService: GoalTrackerService,
    private formService: FormService,
  ) {
    this.createForm();
  };

  ngOnInit(): void {
    const id = this.goalTrackerService.goalId();
    if (id) {
      this.store.select(goal(id)).pipe(take(1)).subscribe(
        goal => {
          if (goal) {
            this.selectedGoal = goal; // make it more efficient later
            this.milestone = goal.milestones;
          }
        }
      )
    };
  }

  get tasks() {
    return this.milestoneForm.get('tasks') as FormArray;
  }

  getControl(form: FormGroup, control: string) {
    return form.get(control) as FormArray;
  }
  
  createForm() {
    this.milestoneForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      tasks: this.fb.array([this.createTask()]),
      status: ['', Validators.required],
    });
  }

  createTask() {
    return this.fb.group({
      title: ['', Validators.required],
      isCompleted: [false, Validators.required],
    })
  }

  addComment() {
    this.tasks.push(this.createTask());
  }

  removeComment(index: number) {
    this.tasks.removeAt(index);
  }

  // const

  onSubmit() {
    const response = this.formService.validate(this.milestoneForm);
    if (!response) return;
    console.log('selected goal: ', this.selectedGoal);

    const updatedData = {
      ...this.selectedGoal,
      milestones: this.selectedGoal.milestones.map(milestone => {
        if (milestone.name === response.status.name) {
          const updated = {
            ...milestone,
            tasks: milestone.tasks ? [response, ...milestone.tasks] : [response]
          };
          return updated;
        } else {
          return milestone
        }
      })
    };

    this.store.dispatch(onUpdateGoal({goal: updatedData}));



    
    this.visible = false;
  }

  hideDialog() {
    this.appSerivce.hideDialog();
    this.appSerivce.isEdit.set(false);
    this.close.emit(false);
  }
}
