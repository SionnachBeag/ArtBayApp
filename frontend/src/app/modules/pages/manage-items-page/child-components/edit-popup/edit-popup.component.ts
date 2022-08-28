import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IItemFormInput } from 'src/app/core/models/IItemFormInput';
import { IItemsOnSaleViewModel } from 'src/app/core/models/IItemsOnSaleViewModel';
import { IUpdateItem } from 'src/app/core/models/IUpdateItem';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { ItemService } from 'src/app/core/services/item-service/item.service';

@Component({
  selector: 'app-edit-popup',
  templateUrl: './edit-popup.component.html',
  styleUrls: ['./edit-popup.component.scss'],
})
export class EditPopupComponent implements OnInit {
  itemData: IItemsOnSaleViewModel;
  message: string = '';
  editItemForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    imgUrl: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    private itemService: ItemService,
    public dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.itemData = data.pageValue;
  }

  onSubmit(): void {
    if (typeof this.authService.getUserIdFromToken() === 'number') {
      const sellerId: number = this.authService.getUserIdFromToken();
      const input: IItemFormInput = this.editItemForm.value;
      const formattedForm: IUpdateItem = {
        ...input,
        userId: sellerId,
      };
      if (this.editItemForm.valid) {
        this.itemService.updateItem(this.itemData.id, formattedForm);
        this.dialog.closeAll();
      } else {
        this.message = 'Invalid form!';
      }
    }
  }

  ngOnInit(): void {
    this.editItemForm.patchValue({
      ...this.itemData,
    });
  }
}
