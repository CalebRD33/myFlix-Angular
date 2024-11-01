import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-info-box',
  templateUrl: './info-box.component.html',
  styleUrl: './info-box.component.scss'
})
export class InfoBoxComponent {
  constructor(
    
    @Inject(MAT_DIALOG_DATA)
        public data: {
            title: string,
            content: string
        }
    ) {}

}
