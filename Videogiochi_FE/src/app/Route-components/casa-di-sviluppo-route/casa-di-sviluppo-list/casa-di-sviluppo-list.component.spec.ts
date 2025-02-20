import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasaDiSviluppoListComponent } from './casa-di-sviluppo-list.component';

describe('CasaDiSviluppoListComponent', () => {
  let component: CasaDiSviluppoListComponent;
  let fixture: ComponentFixture<CasaDiSviluppoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CasaDiSviluppoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasaDiSviluppoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
