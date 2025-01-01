import { Component } from '@angular/core';

// third party libraries
import { ButtonModule } from 'primeng/button';
import { MenuItem, MessageService } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [ButtonModule, MenuModule],
  providers: [MessageService],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  items: MenuItem[] | undefined;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
      this.items = [
          {
            label: 'Goal options',
              items: [
                  {
                      label: 'Edit goal',
                      icon: 'pi pi-file-edit'
                  },
                  {
                      label: 'Delete goal',
                      icon: 'pi pi-trash'
                  }
              ]
          }
      ];
  }

  update() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File created', life: 3000 });
}

delete() {
    this.messageService.add({ severity: 'warn', summary: 'Search Completed', detail: 'No results found', life: 3000 });
}
}
