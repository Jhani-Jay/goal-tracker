import { Component } from '@angular/core';

// third party libraries
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { AppService } from '@app/core/services/app-service/app.service';

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
  isVisible: boolean = false;

  constructor(
    private messageService: MessageService,
    private confirmService: ConfirmationService,
    private appService: AppService,
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
    this.appService.selectedFormType.set('milestone');
    this.appService.showDialog();
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
          console.log('accepted...');
            // this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        },
        reject: () => {
            // this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    })
    // this.messageService.add({ severity: 'warn', summary: 'Search Completed', detail: 'No results found', life: 3000 });
}
}
