import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageItemsPageComponent } from './manage-items-page.component';

describe('ManageItemsPageComponent', () => {
  let component: ManageItemsPageComponent;
  let fixture: ComponentFixture<ManageItemsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageItemsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageItemsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
