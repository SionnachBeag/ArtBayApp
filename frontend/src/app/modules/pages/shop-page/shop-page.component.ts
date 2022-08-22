import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IItemsOnSaleViewModel } from 'src/app/core/models/IItemsOnSaleViewModel';
import { ItemService } from 'src/app/core/services/item-service/item.service';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.scss'],
})
export class ShopPageComponent implements OnInit {
  itemsSubscription!: Subscription;
  items: IItemsOnSaleViewModel[] = [];
  isDisplayed: boolean = true;
  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.itemService.listAllItemsOnSale();
    this.itemsSubscription = this.itemService.itemsObservable$.subscribe(
      (observableResponse: IItemsOnSaleViewModel[]) => {
        this.items = observableResponse;
      }
    );
  }

  ngOnDestroy(): void {
    this.itemsSubscription.unsubscribe();
  }
}
