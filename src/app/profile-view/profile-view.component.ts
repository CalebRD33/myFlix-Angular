import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';

import { EditUserFormComponent } from '../edit-user-form/edit-user-form.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.scss'
})
export class ProfileViewComponent {
  user: any = {};
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) { this.user = JSON.parse(localStorage.getItem('user') || " ") }
  
  openEditUserDialog(): void {
    const dialogRef = this.dialog.open(EditUserFormComponent, {
    // Assigning the dialog a width
    width: '280px',
    data: { user: this.user }
    });

    dialogRef.componentInstance.userUpdated.subscribe((updatedUser: any) => {
      // Update the user information in the parent component
      this.user = updatedUser;
    });
  }

  openDeleteUserDialog(): void {
    this.dialog.open(DeleteUserComponent, {
    // Assigning the dialog a width
    width: '350px'
    });
  }
}
