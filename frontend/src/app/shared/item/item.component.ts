import { Component, Input, OnInit } from '@angular/core';
import { IItemsOnSaleViewModel } from 'src/app/core/models/IItemsOnSaleViewModel';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() itemData!: IItemsOnSaleViewModel;
  constructor() {}

  ngOnInit(): void {}
}
