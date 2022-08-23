import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBuyItemModel } from '../../models/IBuyItemModel';
import { ICreateItem } from '../../models/ICreateItem';
import { ICreateItemViewModel } from '../../models/ICreateItemViewModel';
import { IDeleteItemDataApi } from '../../models/IDeleteItemDataApi';
import { IItemByIdViewModel } from '../../models/IItemByIdViewModel';
import { IItemsOnSaleViewModel } from '../../models/IItemsOnSaleViewModel';
import { ISuccessViewModel } from '../../models/ISuccessViewModel';
import { IUpdateItem } from '../../models/IUpdateItem';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private itemsSubject = new BehaviorSubject<IItemsOnSaleViewModel[]>([]);
  itemsObservable$: Observable<IItemsOnSaleViewModel[]> =
    this.itemsSubject.asObservable();

  private itemsByUserSubject = new BehaviorSubject<IItemsOnSaleViewModel[]>([]);
  itemsByUserObservable$: Observable<IItemsOnSaleViewModel[]> =
    this.itemsByUserSubject.asObservable();

  constructor(private http: HttpClient) {}
  addItem(input: ICreateItem): void {
    this.http
      .post<ICreateItemViewModel>(`${environment.baseUrl}/items`, input, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
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

  listItemsByUser(id: number): void {
    this.http
      .get<IItemsOnSaleViewModel[]>(`${environment.baseUrl}/itemsByUser/${id}`)
      .subscribe((items: IItemsOnSaleViewModel[]) => {
        this.itemsByUserSubject.next(items);
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

  buyItem(id: number, buyerObj: IBuyItemModel): Observable<ISuccessViewModel> {
    return this.http.put<ISuccessViewModel>(
      `${environment.baseUrl}/buyItem/${id}`,
      buyerObj,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    );
  }

  updateItem(id: number, item: IUpdateItem): void {
    this.http
      .put<ISuccessViewModel>(`${environment.baseUrl}/items/${id}`, item, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .subscribe(() => {
        const itemsByUserSubject: IItemsOnSaleViewModel[] =
          this.itemsByUserSubject.getValue();
        const index: number = itemsByUserSubject.findIndex(
          (item) => item.id === id
        );
        itemsByUserSubject[index] = {
          id: id,
          isSold: false,
          ...item,
        };
      });
  }

  deleteItemById(id: number): void {
    this.http
      .delete<IDeleteItemDataApi>(`${environment.baseUrl}/items/${id}`, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .subscribe(() => {
        const itemsByUserSubject: IItemsOnSaleViewModel[] =
          this.itemsByUserSubject.getValue();
        const index: number = itemsByUserSubject.findIndex(
          (item) => item.id === id
        );
        itemsByUserSubject.splice(index, 1);
      });
  }
}
