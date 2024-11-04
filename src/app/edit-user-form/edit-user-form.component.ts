import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrl: './edit-user-form.component.scss'
})

export class EditUserFormComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem('user') || " ");
  @Input() userData = { Username: '', Email: '', Birthday: '' };
  @Output() userUpdated = new EventEmitter<any>();

  constructor (
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditUserFormComponent>,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.userData = {
      Username: this.user.Username,
      Email: this.user.Email,
      Birthday: this.formatDate(this.user.Birthday)
    };
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];  // Returns date in 'YYYY-MM-DD' format
  }

  editUserInfo(): void {
    const updatedData: any = {};
    if (this.userData.Username && this.userData.Username !== this.user.Username) {
      updatedData.Username = this.userData.Username;
    }
    if (this.userData.Email && this.userData.Email !== this.user.Email) {
      updatedData.Email = this.userData.Email;
    }
    if (this.userData.Birthday && this.userData.Birthday !== this.user.Birthday) {
      updatedData.Birthday = this.userData.Birthday;
    }

    if (Object.keys(updatedData).length > 0) {
      this.fetchApiData.editUser(this.user.Username, updatedData).subscribe((response) => {        
        localStorage.setItem('user', JSON.stringify(response));
        this.dialogRef.close();
        this.snackBar.open('User info updated successfully!', 'OK', {duration: 2000});
        this.userUpdated.emit(response);
      }, (response) => {
        console.log(response);
        this.snackBar.open( 'User info failed to update!', 'OK', {
          duration: 2000
        });
      });
    } else {
    this.snackBar.open('No changes detected', 'OK', { duration: 2000 });
    }
  }

}
