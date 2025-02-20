import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasaDiSviluppoFormComponent } from './casa-di-sviluppo-form.component';

describe('CasaDiSviluppoFormComponent', () => {
  let component: CasaDiSviluppoFormComponent;
  let fixture: ComponentFixture<CasaDiSviluppoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CasaDiSviluppoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasaDiSviluppoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
