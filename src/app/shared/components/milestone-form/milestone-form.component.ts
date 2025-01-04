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
  
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private appSerivce: AppService,
    private goalTrackerService: GoalTrackerService,
  ) {
    this.createForm();
  };

  ngOnInit(): void {
    const id = this.goalTrackerService.goalId();
    if (id) {
      this.store.select(goal(id)).pipe(take(1)).subscribe(
        goal => {
          if (goal) {
            this.milestone = goal.milestones;
          }
        }
      )
    };
  }

  get comments() {
    return this.milestoneForm.get('comments') as FormArray;
  }

  getControl(form: FormGroup, control: string) {
    return form.get(control) as FormArray;
  }

  createForm() {
    this.milestoneForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      comments: this.fb.array([['', Validators.required]]),
      status: [''],
      // status: this.fb.array([]),
    });
    // this.getControl(this.milestoneForm, 'status').push()
    // this.goal?.milestones.forEach(milestone => this.getControl(this.milestoneForm, 'status').push(milestone.name));
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
