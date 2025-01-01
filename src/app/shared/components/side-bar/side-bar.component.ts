import { Component } from '@angular/core';

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

}
