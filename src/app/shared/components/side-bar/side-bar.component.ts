import { Component } from '@angular/core';
import { AppService } from '@app/core/services/app-service/app.service';

// third party libraries
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [ButtonModule,],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {

  constructor(
    private appService: AppService,
  ) {};

  showFormDialog() {
    this.appService.selectedFormType.set('goal');
    this.appService.showDialog();
  }

}
