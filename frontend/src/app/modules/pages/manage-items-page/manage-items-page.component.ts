import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemService } from 'src/app/core/services/item-service/item.service';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ICreateItem } from 'src/app/core/models/ICreateItem';
import { IItemFormInput } from 'src/app/core/models/IItemFormInput';
import { IItemsOnSaleViewModel } from 'src/app/core/models/IItemsOnSaleViewModel';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manage-items-page',
  templateUrl: './manage-items-page.component.html',
  styleUrls: ['./manage-items-page.component.scss'],
})
export class ManageItemsPageComponent implements OnInit {
  itemsByUser: IItemsOnSaleViewModel[] = [];
  id!: number;
  itemsByUserSubscription!: Subscription;
  message: string = '';
  itemForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    imgUrl: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
  });
  constructor(
    private itemService: ItemService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onSubmit(): void {
    if (typeof this.authService.getUserIdFromToken() === 'number') {
      const sellerId: number = this.authService.getUserIdFromToken();
      const input: IItemFormInput = this.itemForm.value;
      const formattedForm: ICreateItem = {
        ...input,
        sellerId: sellerId,
      };
      this.itemService.addItem(formattedForm);
      this.router.navigate(['/shop']);
    }
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
    this.itemService.listItemsByUser(this.id);
    this.itemsByUserSubscription =
      this.itemService.itemsByUserObservable$.subscribe(
        (observableResponse: IItemsOnSaleViewModel[]) => {
          this.itemsByUser = observableResponse;
        }
      );
  }

  ngOnDestroy() {
    this.itemsByUserSubscription.unsubscribe();
  }
}
