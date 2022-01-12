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
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'forgot-pw',
    loadChildren: () => import('./pages/forgot-pw/forgot-pw.module').then( m => m.ForgotPwPageModule)
  },
  {
    path: 'new-pw',
    loadChildren: () => import('./pages/new-pw/new-pw.module').then( m => m.NewPwPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'personal-data',
    loadChildren: () => import('./pages/personal-data/personal-data.module').then( m => m.PersonalDataPageModule)
  },  {
    path: 'delete-acc',
    loadChildren: () => import('./pages/delete-acc/delete-acc.module').then( m => m.DeleteAccPageModule)
  },
  {
    path: 'change-pw',
    loadChildren: () => import('./pages/change-pw/change-pw.module').then( m => m.ChangePwPageModule)
  },
  {
    path: 'update-user',
    loadChildren: () => import('./pages/update-user/update-user.module').then( m => m.UpdateUserPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
