import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkdayComponent } from './views/workday/workday.component';
import { extract } from '@app/core';

const routes: Routes = [{ path: '', component: WorkdayComponent, data: { title: extract('Workday') } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkdayRoutingModule {}
