import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideogiochiUpdateComponent } from './videogioco-update.component';

describe('VideogiocoUpdateComponent', () => {
  let component: VideogiochiUpdateComponent;
  let fixture: ComponentFixture<VideogiochiUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideogiochiUpdateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VideogiochiUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
