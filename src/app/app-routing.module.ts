import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'forgot-pw',
    loadChildren: () => import('./pages/auth/forgot-pw/forgot-pw.module').then( m => m.ForgotPwPageModule)
  },
  {
    path: 'new-pw',
    loadChildren: () => import('./pages/auth/new-pw/new-pw.module').then( m => m.NewPwPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/auth/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'personal-data',
    loadChildren: () => import('./pages/settings/personal-data/personal-data.module').then( m => m.PersonalDataPageModule)
  },
  {
    path: 'delete-acc',
    loadChildren: () => import('./pages/settings/delete-acc/delete-acc.module').then( m => m.DeleteAccPageModule)
  },
  {
    path: 'change-pw',
    loadChildren: () => import('./pages/settings/change-pw/change-pw.module').then( m => m.ChangePwPageModule)
  },
  {
    path: 'update-user',
    loadChildren: () => import('./pages/settings/update-user/update-user.module').then( m => m.UpdateUserPageModule)
  },
  {
    path: 'create-group',
    loadChildren: () => import('./pages/group/create-group/create-group.module').then( m => m.CreateGroupPageModule)
  },
  {
    path: 'detail-group-page',
    loadChildren: () => import('./pages/group/detail-group-page/detail-group-page.module').then( m => m.DetailGroupPagePageModule)
  },
  {
    path: 'edit-group',
    loadChildren: () => import('./pages/group/edit-group/edit-group.module').then( m => m.EditGroupPageModule)
  },
  {
    path: 'edit-group-user',
    loadChildren: () => import('./pages/group/edit-group-user/edit-group-user.module').then( m => m.EditGroupUserPageModule)
  },
  {
    path: 'invite-person',
    loadChildren: () => import('./pages/group/invite-person/invite-person.module').then( m => m.InvitePersonPageModule)
  },  {
    path: 'create-order',
    loadChildren: () => import('./pages/home/create-order/create-order.module').then( m => m.CreateOrderPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
