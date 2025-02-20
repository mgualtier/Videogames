import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaRouteComponent } from './categoria-route.component';

describe('CategoriaRouteComponent', () => {
  let component: CategoriaRouteComponent;
  let fixture: ComponentFixture<CategoriaRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriaRouteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
