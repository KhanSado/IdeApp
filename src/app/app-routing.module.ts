// Angular Import
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// project import
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { AuthGuard } from './demo/guards/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/auth/signin',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () => import('./demo/home/home.component').then(m => m.HomeComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'announcement',
        loadComponent: () => import('./demo/announcement/announcement.component').then(m => m.AnnouncementComponent),
        canActivate: [AuthGuard]
      },
      // {
      //   path: 'analytics',
      //   loadComponent: () => import('./demo/dashboard/dash-analytics.component')
      // },
      // {
      //   path: 'component',
      //   loadChildren: () => import('./demo/ui-element/ui-basic.module').then((m) => m.UiBasicModule)
      // },
      // {
      //   path: 'chart',
      //   loadComponent: () => import('./demo/chart & map/core-apex.component')
      // },
      {
        path: 'forms',
        loadComponent: () => import('./demo/forms & tables/form-elements/form-elements.component')
      },
      // {
      //   path: 'tables',
      //   loadComponent: () => import('./demo/forms & tables/tbl-bootstrap/tbl-bootstrap.component')
      // },
      // {
      //   path: 'sample-page',
      //   loadComponent: () => import('./demo/sample-page/sample-page.component')
      // }
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'auth/signup',
        loadComponent: () => import('./demo/authentication/sign-up/sign-up.component')
      },
      {
        path: 'auth/signin',
        loadComponent: () => import('./demo/authentication/sign-in/sign-in.component')
      },
      {
        path: 'profissionais',
        loadComponent: () => import('./demo/public-announcements/public-announcements.component').then(m => m.PublicAnnouncementsComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
