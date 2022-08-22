import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IItemsOnSaleViewModel } from 'src/app/core/models/IItemsOnSaleViewModel';
import { ItemService } from 'src/app/core/services/item-service/item.service';

@Component({
  selector: 'app-my-items-page',
  templateUrl: './my-items-page.component.html',
  styleUrls: ['./my-items-page.component.scss'],
})
export class MyItemsPageComponent implements OnInit {
  itemsBought: IItemsOnSaleViewModel[] = [];
  id!: number;
  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

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
      .listItemsBought(this.id)
      .subscribe((response: IItemsOnSaleViewModel[]) => {
        this.itemsBought = response;
      });
  }
}
