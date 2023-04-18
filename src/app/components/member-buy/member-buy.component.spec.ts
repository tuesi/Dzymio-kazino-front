import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberBuyComponent } from './member-buy.component';

describe('MemberBuyComponent', () => {
  let component: MemberBuyComponent;
  let fixture: ComponentFixture<MemberBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberBuyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
