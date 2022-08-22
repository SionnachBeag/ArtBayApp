import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyItemsPageComponent } from './my-items-page.component';

describe('MyItemsPageComponent', () => {
  let component: MyItemsPageComponent;
  let fixture: ComponentFixture<MyItemsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyItemsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyItemsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
