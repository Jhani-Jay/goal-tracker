import { Component, EventEmitter, Output, output } from '@angular/core';

// third party libraries
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

// local imports
import { AppService } from '@core/services/app-service/app.service';

@Component({
  selector: 'app-milestone-form',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule],
  templateUrl: './milestone-form.component.html',
  styleUrl: './milestone-form.component.scss'
})
export class MilestoneFormComponent {
  visible: boolean = true;
  close = output<boolean>();
  
  constructor(
    private appSerivce: AppService,
  ) {};

  hideDialog() {
    this.appSerivce.hideDialog();
    this.close.emit(false);
  }
}
