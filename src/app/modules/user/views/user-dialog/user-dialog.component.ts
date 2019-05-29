import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { User } from '@app/core/models/User';
import { UserService } from '@app/core/services/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  userForm: FormGroup;
  newRecord = false;
  user: User = {} as User;
  hide = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    public snackBar: MatSnackBar,
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      id: new FormControl({ value: '', disabled: true }),
      username: new FormControl('', [Validators.required, Validators.minLength(6)]),
      admin: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordReentered: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    if (this.data['user']) {
      this.loadForm(this.data['user']);
    } else {
      this.newRecord = true;
    }
  }

  public destroy() {
    const user: User = this.retrieveFormData();
    this.userService.delete(user.id).subscribe(
      (data: any) => {
        console.log('User deleted: ', data);
        this.closeDialog();
        // this.snackBar.open('Yeeeeey! Registro foi excluído com sucesso!', 'Valeu!', {
        //  duration: 3000
        // });
      },
      (error: any) => {
        // this.snackBar.open('Vishhh, algo deu errado! Tente novamente.', 'Fechar :(', {
        //  duration: 3000
        // });
        console.log('Error: ', error);
      }
    );
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public save(): void {
    const user: User = this.retrieveFormData();
    if (user.id) {
      this.updateUser(user);
    } else {
      user.id = undefined;
      if (!user.admin) {
        user.admin = false;
      }
      this.createNewUser(user);
    }
  }

  private updateUser(user: User): void {
    this.userService.update(user).subscribe(
      (data: any) => {
        console.log('User updated: ', data);
        this.closeDialog();
        // this.snackBar.open('Yeeeeey! Registro foi atualizado com sucesso!', 'Valeu!', {
        //  duration: 3000
        // });
      },
      (error: any) => {
        // this.snackBar.open('Vishhh, algo deu errado! Tente novamente.', 'Fechar :(', {
        //  duration: 3000
        // });
        console.log('Error update user: ', error, user);
      }
    );
  }

  private createNewUser(user: User): void {
    this.userService.post(user).subscribe(
      (data: any) => {
        console.log('User created: ', data);
        this.closeDialog();
        // this.snackBar.open('Yeeeeey! Registro foi atualizado com sucesso!', 'Valeu!', {
        //  duration: 3000
        // });
      },
      (error: any) => {
        // this.snackBar.open('Vishhh, algo deu errado! Tente novamente.', 'Fechar :(', {
        //  duration: 3000
        // });
        console.log('Error create new user: ', error, user);
      }
    );
  }

  private loadForm(user: User): void {
    console.log('loadForm: ', user);
    this.userForm.controls.id.setValue(user.id);
    this.userForm.controls.username.setValue(user.username);
    this.userForm.controls.email.setValue(user.email);
    this.userForm.controls.admin.setValue(user.admin);
    this.newRecord = false;
  }

  private retrieveFormData(): User {
    const formData: User = {} as User;
    formData.id = this.userForm.controls.id.value;
    formData.username = this.userForm.controls.username.value;
    formData.admin = this.userForm.controls.admin.value;
    formData.email = this.userForm.controls.email.value;
    formData.password = this.userForm.controls.password.value;
    return formData;
  }
}
