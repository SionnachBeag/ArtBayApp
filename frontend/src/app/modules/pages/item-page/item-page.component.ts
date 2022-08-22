import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IItemByIdViewModel } from 'src/app/core/models/IItemByIdViewModel';
import { ItemService } from 'src/app/core/services/item-service/item.service';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.scss'],
})
export class ItemPageComponent implements OnInit {
  itemsSubscription!: Subscription;
  item!: IItemByIdViewModel;
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
      .subscribe((response: IItemByIdViewModel) => {
        this.item = response;
      });
  }
}
