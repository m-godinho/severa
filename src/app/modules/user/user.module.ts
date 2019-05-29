import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './views/user-list/user-list.component';
import { MaterialModule } from '@app/material.module';
import { UserService } from '@app/core/services/user.service';
import { UserDialogComponent } from './views/user-dialog/user-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatSnackBarModule } from '@angular/material';

@NgModule({
  declarations: [UserListComponent, UserDialogComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatSnackBarModule
  ],
  providers: [UserService],
  entryComponents: [UserDialogComponent]
})
export class UserModule {}
