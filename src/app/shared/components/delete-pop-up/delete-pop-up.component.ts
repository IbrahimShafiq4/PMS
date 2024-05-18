import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
interface IData{
  itemId:number
 }
@Component({
  selector: 'app-delete-pop-up',
  templateUrl: './delete-pop-up.component.html',
  styleUrls: ['./delete-pop-up.component.scss']
})
export class DeletePopUpComponent {
  constructor(
    private dialogRef: MatDialogRef<DeletePopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IData
  ) {
}
onNoClick(): void {
  this.dialogRef.close();
}
}
