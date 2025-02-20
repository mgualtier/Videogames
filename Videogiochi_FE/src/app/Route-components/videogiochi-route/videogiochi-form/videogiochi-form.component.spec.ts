import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideogiochiFormComponent } from './videogiochi-form.component';

describe('VideogiochiFormComponent', () => {
  let component: VideogiochiFormComponent;
  let fixture: ComponentFixture<VideogiochiFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideogiochiFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideogiochiFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
