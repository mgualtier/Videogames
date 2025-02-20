import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiattaformaFormComponent } from './piattaforma-form.component';

describe('PiattaformaFormComponent', () => {
  let component: PiattaformaFormComponent;
  let fixture: ComponentFixture<PiattaformaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PiattaformaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiattaformaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
