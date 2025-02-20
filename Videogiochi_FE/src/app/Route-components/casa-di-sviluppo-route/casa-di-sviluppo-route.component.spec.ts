import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasaDiSviluppoRouteComponent } from './casa-di-sviluppo-route.component';

describe('CasaDiSviluppoRouteComponent', () => {
  let component: CasaDiSviluppoRouteComponent;
  let fixture: ComponentFixture<CasaDiSviluppoRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CasaDiSviluppoRouteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasaDiSviluppoRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
