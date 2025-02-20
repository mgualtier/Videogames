import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideogiochiRouteComponent } from './videogiochi-route.component';

describe('VideogiochiRouteComponent', () => {
  let component: VideogiochiRouteComponent;
  let fixture: ComponentFixture<VideogiochiRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideogiochiRouteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideogiochiRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
