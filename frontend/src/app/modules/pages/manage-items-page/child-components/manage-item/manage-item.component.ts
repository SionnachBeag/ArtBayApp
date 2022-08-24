import { Component, Input } from '@angular/core';
import { IItemsOnSaleViewModel } from 'src/app/core/models/IItemsOnSaleViewModel';
import { ItemService } from 'src/app/core/services/item-service/item.service';
import { EditPopupComponent } from '../edit-popup/edit-popup.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationPopupComponent } from 'src/app/shared/confirmation-popup/confirmation-popup.component';

@Component({
  selector: 'app-manage-item',
  templateUrl: './manage-item.component.html',
  styleUrls: ['./manage-item.component.scss'],
})
export class ManageItemComponent {
  @Input() itemData!: IItemsOnSaleViewModel;
  constructor(private itemService: ItemService, public dialog: MatDialog) {}

  openDeleteModal(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = 'custom-dialog-container';
    dialogConfig.data = {
      id: this.itemData.id,
      name: 'deleteItem',
      question: 'Are you sure you want to delete this item?',
      cancelButtonText: 'No',
      actionButtonText: 'Yes',
    };
    this.dialog.open(ConfirmationPopupComponent, dialogConfig);
  }

  onEdit(): void {
    this.dialog.open(EditPopupComponent, {
      panelClass: 'custom-dialog-container',
      data: { pageValue: this.itemData },
    });
  }
}
