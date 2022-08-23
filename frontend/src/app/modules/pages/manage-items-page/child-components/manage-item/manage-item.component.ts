import { Component, Input } from '@angular/core';
import { IItemsOnSaleViewModel } from 'src/app/core/models/IItemsOnSaleViewModel';
import { ItemService } from 'src/app/core/services/item-service/item.service';
import { EditPopupComponent } from '../edit-popup/edit-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-item',
  templateUrl: './manage-item.component.html',
  styleUrls: ['./manage-item.component.scss'],
})
export class ManageItemComponent {
  @Input() itemData!: IItemsOnSaleViewModel;
  constructor(private itemService: ItemService, public dialog: MatDialog) {}

  onDelete(): void {
    this.itemService.deleteItemById(this.itemData.id);
  }

  onEdit(): void {
    this.dialog.open(EditPopupComponent, {
      panelClass: 'custom-dialog-container',
      data: { pageValue: this.itemData },
    });
  }
}
