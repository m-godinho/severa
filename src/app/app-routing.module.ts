import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'about',
      loadChildren: 'app/about/about.module#AboutModule'
    },
    {
      path: 'profile',
      loadChildren: 'app/modules/profile/profile.module#ProfileModule'
    },
    {
      path: 'users',
      loadChildren: 'app/modules/user/user.module#UserModule'
    },
    {
      path: 'workday',
      loadChildren: 'app/modules/workday/workday.module#WorkdayModule'
    }
  ]),
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
