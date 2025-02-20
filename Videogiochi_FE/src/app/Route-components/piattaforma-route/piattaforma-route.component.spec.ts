import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiattaformaRouteComponent } from './piattaforma-route.component';

describe('PiattaformaRouteComponent', () => {
  let component: PiattaformaRouteComponent;
  let fixture: ComponentFixture<PiattaformaRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PiattaformaRouteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiattaformaRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
