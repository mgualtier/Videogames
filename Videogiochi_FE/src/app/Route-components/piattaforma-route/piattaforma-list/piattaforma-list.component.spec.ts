import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiattaformaListComponent } from './piattaforma-list.component';

describe('PiattaformaListComponent', () => {
  let component: PiattaformaListComponent;
  let fixture: ComponentFixture<PiattaformaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PiattaformaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiattaformaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
