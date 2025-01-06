import { Component, OnInit, WritableSignal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';

// third party libraries
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

// local imports
import { NavBarComponent } from "./shared/components/nav-bar/nav-bar.component";
import { SideBarComponent } from "./shared/components/side-bar/side-bar.component";
import { AppService } from './core/services/app-service/app.service';
import { GoalFormComponent } from "./shared/components/goal-form/goal-form.component";
import { MilestoneFormComponent } from "./shared/components/milestone-form/milestone-form.component";
import { AppState } from './core/model/AppState.model';
import { onLoadGoals } from './core/state/goal.action';
import { SubtaskDetailsComponent } from './shared/components/subtask-details/subtask-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, ConfirmDialogModule, NavBarComponent, SideBarComponent, GoalFormComponent, MilestoneFormComponent, SubtaskDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'goal-tracker';
  isVisible$!:Observable<boolean>
  activeForm: WritableSignal<string | null> = this.appService.selectedFormType;

  constructor(
    private store: Store<AppState>,
    private appService: AppService,
  ) {};

  ngOnInit(): void {
    this.store.dispatch(onLoadGoals());
    this.isVisible$ = this.appService.getVisibility();
    // this.activeForm = this.appService.selectedFormType();
    // console.log('active form is: ', this.activeForm());
  }

  hideForm(state:boolean) {
    // console.log('state of the form is: ', state);
    if (!state) {
      this.isVisible$ = this.appService.getVisibility();
      this.appService.selectedFormType.set(null);
    }
  }
}
