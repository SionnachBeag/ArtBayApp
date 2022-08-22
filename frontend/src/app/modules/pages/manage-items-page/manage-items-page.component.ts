import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemService } from 'src/app/core/services/item-service/item.service';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { Router } from '@angular/router';
import { ICreateItem } from 'src/app/core/models/ICreateItem';
import { IItemFormInput } from 'src/app/core/models/IItemFormInput';

@Component({
  selector: 'app-manage-items-page',
  templateUrl: './manage-items-page.component.html',
  styleUrls: ['./manage-items-page.component.scss'],
})
export class ManageItemsPageComponent implements OnInit {
  message: string = '';
  itemForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    imgUrl: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
  });
  constructor(
    private itemService: ItemService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (typeof this.authService.getUserIdFromToken() === 'number') {
      const sellerId: number = this.authService.getUserIdFromToken();
      const input: IItemFormInput = this.itemForm.value;
      const formattedForm: ICreateItem = {
        ...input,
        sellerId: sellerId,
      };
      this.itemService.addItem(formattedForm);
      this.router.navigate(['/shop']);
    }
  }
}
