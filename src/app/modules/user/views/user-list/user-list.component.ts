import { AfterViewInit, Component } from '@angular/core';
import { UserService } from '@app/core/services/user.service';
import { User } from '@app/core/models/User';
import { MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';
import { UserDialogComponent } from '@app/modules/user/views/user-dialog/user-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements AfterViewInit {
  public displayedColumns: string[] = ['username', 'email', 'action'];
  public dataSource: MatTableDataSource<User>;
  public showFilter = false;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private translate: TranslateService,
    public snackBar: MatSnackBar,
    private media: MediaObserver
  ) {}

  /**
   * en-US: Event method of post-construction components on screen
   * pt-BR: Método do evento de pós construção dos componentes em tela
   * @return void
   */
  ngAfterViewInit(): void {
    this.getAllUsers();
  }

  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }

  /**
   * en-US: Upload method for all registered users
   * pt-BR: Método de carregamento de todos os usuários registrados
   * @return void
   */
  public getAllUsers(): void {
    this.userService.getAll().subscribe(
      data => {
        if (data && data.length > 0) {
          this.setUserListDataSource(data);
        }
      },
      error => {
        this.snackBar.open(this.translate.instant('Oh no, something went wrong. :('), null, {
          duration: 3000
        });
        console.log('Error: ', error);
      }
    );
  }

  public destroy(userId: number): void {
    this.userService.delete(userId).subscribe(
      data => {
        if (data) {
          this.snackBar.open(
            this.translate.instant("That's right buddy, the user was sent to space!"),
            this.translate.instant('Nice!'),
            {
              duration: 3000
            }
          );
          this.getAllUsers();
        }
      },
      error => {
        this.snackBar.open(this.translate.instant('Oh no, something went wrong. :('), null, {
          duration: 3000
        });
        console.log('Error: ', error);
      }
    );
  }

  public showDialog(user?: User): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '450px',
      disableClose: true,
      data: {
        user
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllUsers();
    });
  }

  public applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public setFilterVisibility(): void {
    if (this.showFilter) {
      this.showFilter = false;
    } else if (!this.showFilter) {
      this.showFilter = true;
    }
  }

  private setUserListDataSource(data: User[]): void {
    this.dataSource = new MatTableDataSource(data);
  }
}
