import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberShopListComponent } from './member-shop-list.component';

describe('MemberShopListComponent', () => {
  let component: MemberShopListComponent;
  let fixture: ComponentFixture<MemberShopListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberShopListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberShopListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
