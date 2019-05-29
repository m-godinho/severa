import { LayoutModule } from '@angular/cdk/layout';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatIconModule,
  MatMenuModule,
  MatCheckboxModule,
  MatTableModule
} from '@angular/material';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './views/home/home.component';
import { TranslateModule } from '@ngx-translate/core';
import { WorklogTableListComponent } from './components/worklog-table-list/worklog-table-list.component';
import { WorklogService } from '@app/core/services/worklog.service';

@NgModule({
  declarations: [HomeComponent, WorklogTableListComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule,
    LayoutModule,
    ScrollDispatchModule
  ],
  providers: [WorklogService]
})
export class HomeModule {}
