import { Injectable } from '@angular/core';
import { ItemService } from '../item-service/item.service';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private itemService: ItemService) {}

  modalAction(modalData: { [key: string]: string }): void {
    switch (modalData['name']) {
      case 'deleteItem':
        this.deleteItem(modalData);
        break;

      default:
        break;
    }
  }

  private deleteItem(modalData: { [key: string]: string }): void {
    const id = parseInt(modalData['id']);
    this.itemService.deleteItemById(id);
  }
}
