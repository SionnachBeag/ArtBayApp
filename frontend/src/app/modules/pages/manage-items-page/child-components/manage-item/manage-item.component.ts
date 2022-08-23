import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IItemsOnSaleViewModel } from 'src/app/core/models/IItemsOnSaleViewModel';
import { ItemService } from 'src/app/core/services/item-service/item.service';

@Component({
  selector: 'app-manage-item',
  templateUrl: './manage-item.component.html',
  styleUrls: ['./manage-item.component.scss'],
})
export class ManageItemComponent implements OnInit {
  @Input() itemData!: IItemsOnSaleViewModel;
  constructor(private itemService: ItemService, private router: Router) {}

  onDelete() {
    this.itemService.deleteItemById(this.itemData.id);
  }

  onEdit() {}

  ngOnInit(): void {}
}
