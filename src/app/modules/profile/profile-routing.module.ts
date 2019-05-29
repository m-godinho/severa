import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './views/profile/profile.component';
import { extract } from '@app/core';

const routes: Routes = [{ path: '', component: ProfileComponent, data: { title: extract('Profile') } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
