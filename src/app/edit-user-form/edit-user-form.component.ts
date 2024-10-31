import { Component, OnInit, Input} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrl: './edit-user-form.component.scss'
})

export class EditUserFormComponent implements OnInit {
  user: any = {};
  @Input() userData = { Username: '', Email: '', Birthday: '' };

  constructor (
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditUserFormComponent>,
    public snackBar: MatSnackBar,
  ) { this.user = JSON.parse(localStorage.getItem('user') || " ") }

  ngOnInit(): void {}

  editUserInfo(): void {
    
  }

}
