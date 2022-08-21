import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IItemsOnSaleViewModel } from '../../models/IItemsOnSaleViewModel';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private itemsSubject = new BehaviorSubject<IItemsOnSaleViewModel[]>([]);
  itemsObservable$: Observable<IItemsOnSaleViewModel[]> =
    this.itemsSubject.asObservable();

  constructor(private http: HttpClient) {}
  listAllItemsOnSale() {
    this.http
      .get<IItemsOnSaleViewModel[]>(`${environment.baseUrl}/items`)
      .subscribe((items: IItemsOnSaleViewModel[]) => {
        this.itemsSubject.next(items);
      });
  }

  getItemById(id: number): Observable<IItemsOnSaleViewModel> {
    return this.http.get<IItemsOnSaleViewModel>(
      `${environment.baseUrl}/items/${id}`
    );
  }
}
