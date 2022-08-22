import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBuyItemModel } from 'src/app/core/models/IBuyItemModel';
import { IItemsOnSaleViewModel } from 'src/app/core/models/IItemsOnSaleViewModel';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { ItemService } from 'src/app/core/services/item-service/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input() itemData!: IItemsOnSaleViewModel;
  @Input() isDisplayed!: boolean;
  constructor(
    private authService: AuthService,
    private itemService: ItemService,
    private router: Router
  ) {}

  onClick(): void {
    if (typeof this.authService.getUserIdFromToken() === 'number') {
      const buyerId: number = this.authService.getUserIdFromToken();
      const buyerObj: IBuyItemModel = {
        buyerId: buyerId,
      };
      this.itemService
        .buyItem(this.itemData.id, buyerObj)
        .subscribe((response) => {
          if (response.status === 200) {
            this.router.navigate(['/myItems'], {
              queryParams: { id: buyerId },
            });
            console.log(response.message);
          }
        });
    }
  }
}
