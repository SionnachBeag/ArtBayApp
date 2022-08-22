import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICreateItem } from '../../models/ICreateItem';
import { ICreateItemViewModel } from '../../models/ICreateItemViewModel';
import { IItemByIdViewModel } from '../../models/IItemByIdViewModel';
import { IItemsOnSaleViewModel } from '../../models/IItemsOnSaleViewModel';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private itemsSubject = new BehaviorSubject<IItemsOnSaleViewModel[]>([]);
  itemsObservable$: Observable<IItemsOnSaleViewModel[]> =
    this.itemsSubject.asObservable();

  constructor(private http: HttpClient) {}
  addItem(input: ICreateItem): void {
    this.http
      .post<ICreateItemViewModel>(`${environment.baseUrl}/items`, input)
      .subscribe((response: ICreateItemViewModel) => {
        const itemsSubject: IItemsOnSaleViewModel[] =
          this.itemsSubject.getValue();
        itemsSubject.push({
          ...input,
          isSold: false,
          id: response.id,
        });
        this.itemsSubject.next(itemsSubject);
      });
  }

  listAllItemsOnSale(): void {
    this.http
      .get<IItemsOnSaleViewModel[]>(`${environment.baseUrl}/items`)
      .subscribe((items: IItemsOnSaleViewModel[]) => {
        this.itemsSubject.next(items);
      });
  }

  listItemsBought(id: number): Observable<IItemsOnSaleViewModel[]> {
    return this.http.get<IItemsOnSaleViewModel[]>(
      `${environment.baseUrl}/myItems/${id}`
    );
  }

  getItemById(id: number): Observable<IItemByIdViewModel> {
    return this.http.get<IItemByIdViewModel>(
      `${environment.baseUrl}/items/${id}`
    );
  }
}
