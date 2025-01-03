import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '@app/core/model/AppState.model';
import { Goal } from '@app/core/model/goal.model';
import { AppService } from '@app/core/services/app-service/app.service';
import { goals } from '@app/core/state/goal.selector';
import { Store } from '@ngrx/store';

// third party libraries
import { ButtonModule } from 'primeng/button';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [ButtonModule, AsyncPipe,],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  goals$:Observable<Goal[]> = this.store.select(goals);

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private appService: AppService,
  ) {};

  showFormDialog() {
    this.appService.selectedFormType.set('goal');
    this.appService.showDialog();
  }

}
