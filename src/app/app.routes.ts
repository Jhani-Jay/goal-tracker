import { Routes } from '@angular/router';

export const routes: Routes = [
    // {
    //     path: '',
    //     children: [
    //         {
    //             path: '',
    //             loadComponent: () => import('./feature/empty-dashboard/empty-dashboard.component')
    //                 .then(e => e.EmptyDashboardComponent),
    //             title: 'Select a goal',
    //         }
    //     ]
    // },
    {
        // path: 'goal/:id',
        path: '',
        loadComponent: () => import('./feature/goal/goal.component')
            .then(g => g.GoalComponent),
        title: 'Goal',
    }
];
