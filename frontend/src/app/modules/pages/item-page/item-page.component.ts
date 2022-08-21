import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IItemsOnSaleViewModel } from 'src/app/core/models/IItemsOnSaleViewModel';
import { ItemService } from 'src/app/core/services/item-service/item.service';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.scss'],
})
export class ItemPageComponent implements OnInit {
  itemsSubscription!: Subscription;
  item!: IItemsOnSaleViewModel;
  id!: number;

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  get ImgUrl(): string | null {
    return this.item && this.item.imgUrl
      ? `http://localhost:3000/${this.item.imgUrl}`
      : null;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      try {
        this.id = parseInt(params['id']);
      } catch (err) {
        this.router.navigateByUrl('/pageNotFound');
        return;
      }
    });

    this.itemService
      .getItemById(this.id)
      .subscribe((response: IItemsOnSaleViewModel) => {
        this.item = response;
      });
  }
}
