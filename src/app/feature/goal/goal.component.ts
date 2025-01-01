import { Component } from '@angular/core';

// third party libraries
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-goal',
  standalone: true,
  imports: [ButtonModule, ],
  templateUrl: './goal.component.html',
  styleUrl: './goal.component.scss'
})
export class GoalComponent {

}
