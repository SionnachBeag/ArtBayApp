import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalService } from 'src/app/core/services/modal-service/modal.service';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.scss'],
})
export class ConfirmationPopupComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: { [key: string]: string },
    private modalService: ModalService
  ) {}

  actionFunction(): void {
    this.modalService.modalAction(this.modalData);
    this.closeModal();
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
