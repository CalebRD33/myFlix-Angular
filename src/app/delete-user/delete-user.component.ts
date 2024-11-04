import { Component, OnInit, Input} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.scss'
})
export class DeleteUserComponent {

  constructor (
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<DeleteUserComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
    public authService: AuthService
  ) { }

  deleteAccount(): void {
    const user = JSON.parse(localStorage.getItem('user') || "");

    this.fetchApiData.deleteUser(user.Username).subscribe((resp) => {
     
    },
    (resp) => {
      console.log(resp)
      this.snackBar.open('Your account has been successfully deleted', 'OK', {duration: 2000});
      this.dialogRef.close();
      this.router.navigate(['']);
      this.authService.logout();
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    });
  }

}
