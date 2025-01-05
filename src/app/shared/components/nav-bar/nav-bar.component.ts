import { Component, WritableSignal } from '@angular/core';

// third party libraries
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { AppService } from '@app/core/services/app-service/app.service';
import { GoalTrackerService } from '@app/core/services/goal-tracker-service/goal-tracker.service';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core/model/AppState.model';
import { onDeleteGoal } from '@app/core/state/goal.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [ButtonModule, MenuModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  items: MenuItem[] | undefined;
  isVisible: boolean = false;
  selectedGoal:WritableSignal<{ id: string; title: string; } | null> = this.goalTrackerService.selectedGoal;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private confirmService: ConfirmationService,
    private appService: AppService,
    private goalTrackerService: GoalTrackerService,
  ) {}

  ngOnInit() {
      this.items = [
          {
            label: 'Goal options',
              items: [
                  {
                      label: 'Edit goal',
                      icon: 'pi pi-file-edit',
                      command: () => this.showFormDialog()
                  },
                  {
                      label: 'Delete goal',
                      icon: 'pi pi-trash',
                      command: () => this.delete()
                  }
              ]
          }
      ];
  }

  showFormDialog() {
    this.appService.selectedFormType.set('goal');
    this.appService.showDialog();
    this.appService.isEdit.set(true);
  }

  showMilestoneFormDialog() {
    this.appService.selectedFormType.set('milestone');
    this.appService.showDialog();
    this.appService.isEdit.set(false);
  }

delete() {
    this.confirmService.confirm({
        message: 'Are you sure you want to delete the ‘Platform Launch’ board? This action will remove all columns and tasks and cannot be reversed.',
        header: 'Delete this goal?',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"accept-delete",
        rejectButtonStyleClass:"reject-delete",
        acceptIcon:"none",
        rejectIcon:"none",
        accept: () => {
          // dispatch action from here
          const id = this.selectedGoal()?.id;
          if (id) {
            this.store.dispatch(onDeleteGoal({id}));
            this.selectedGoal.set(null);
            this.router.navigate(['']);
          }
        },
        reject: () => {
          return;
        }
    })
}
}
