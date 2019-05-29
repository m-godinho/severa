import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkdayRoutingModule } from './workday-routing.module';
import { WorkdayComponent } from './views/workday/workday.component';
import { MaterialModule } from '@app/material.module';

@NgModule({
  declarations: [WorkdayComponent],
  imports: [CommonModule, WorkdayRoutingModule, MaterialModule]
})
export class WorkdayModule {}
