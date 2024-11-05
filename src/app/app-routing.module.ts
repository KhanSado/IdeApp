// Angular Import
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// project import
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { RoleGuard } from './guards/role.guard';

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
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['admin', 'ebd', 'cult', 'praise'] } // Adicione as roles permitidas aqui

      },
      {
        path: 'announcement',
        loadComponent: () => import('./pages/announcement/announcement.component').then(m => m.AnnouncementComponent),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['admin'] }
      },
      {
        path: 'cult-control/dashboard',
        loadComponent: () => import('./pages/cult-control/cult-control.component').then(m => m.CultControlComponent),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['admin','cult'] }
      },
      {
        path: 'cult-control/new',
        loadComponent: () => import('./pages/cult-control/new-cult/new-cult.component').then(m => m.NewCultComponent),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['admin','cult'] }
      },
      {
        path: 'cult-control/visitor',
        loadComponent: () => import('./pages/cult-control/new-cult-visit/new-cult-visit.component').then(m => m.NewCultVisitComponent),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['admin','cult'] }
      },
      {
        path: 'cult-control/reception-team',
        loadComponent: () => import('./pages/cult-control/reception-team/reception-team.component').then(m => m.ReceptionTeamComponent),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['admin','cult'] }
      },
      {
        path: 'cult-control/visitor-list',
        loadComponent: () => import('./pages/cult-control/visitor/visitor.component').then(m => m.VisitorComponent),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['admin','cult'] }
      },
      {
        path: 'cult-control/cult-details/:id',
        loadComponent: () => import('./pages/cult-control/cult-details/cult-details.component').then(m => m.CultDetailsComponent),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['admin','cult'] }
      },



      //Tela de não autoizado
      {
        path: 'route-not-authorized',
        loadComponent: () => import('./pages/not-authorized/not-authorized.component').then(m => m.NotAuthorizedComponent),
        canActivate: [AuthGuard]
      },


      {
        path: 'ebd-control/new-professor',
        loadComponent: () => import('./pages/ebd-control/new-professor/new-professor.component').then(m => m.NewProfessorComponent),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['admin','ebd']}
      },
      {
        path: 'ebd-control/new-class',
        loadComponent: () => import('./pages/ebd-control/new-class/new-class.component').then(m => m.NewClassComponent),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['admin','ebd']}
      },
      {
        path: 'ebd-control/new-classroom',
        loadComponent: () => import('./pages/ebd-control/new-classroom/new-classroom.component').then(m => m.NewClassroomComponent),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['admin','ebd']}
      },
      {
        path: 'ebd-control/classroom-dashboard',
        loadComponent: () => import('./pages/ebd-control/classroom-dashboard/classroom-dashboard.component').then(m => m.ClassroomDashboardComponent),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['admin','ebd']}
      },
      {
        path: 'ebd-control/new-student',
        loadComponent: () => import('./pages/ebd-control/new-student/new-student.component').then(m => m.NewStudentComponent),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['admin','ebd']}
      },
      {
        path: 'ebd-control/classroom-details/:id',
        loadComponent: () => import('./pages/ebd-control/classroom-details/classroom-details.component').then(m => m.ClassroomDetailsComponent),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['admin','ebd']}
      }
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'auth/signup',
        loadComponent: () => import('./pages/authentication/sign-up/sign-up.component')
      },
      {
        path: 'auth/signin',
        loadComponent: () => import('./pages/authentication/sign-in/sign-in.component')
      },
      {
        path: 'profissionais',
        loadComponent: () => import('./public-pages/public-announcements/public-announcements.component').then(m => m.PublicAnnouncementsComponent)
      },
      {
        path: 'resources',
        loadComponent: () => import('./public-pages/resources/resources.component').then(m => m.ResourcesComponent)
      },
      // {
      //   path: 'elections/saf',
      //   loadComponent: () => import('./public-pages/elections/saf/saf.component').then(m => m.SafComponent)
      // },
      // {
      //   path: 'elections/uph',
      //   loadComponent: () => import('./public-pages/elections/uph/uph.component').then(m => m.UphComponent)
      // }
      {
        path: 'elections/upa',
        loadComponent: () => import('./public-pages/elections/upa/upa.component').then(m => m.UpaComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}


