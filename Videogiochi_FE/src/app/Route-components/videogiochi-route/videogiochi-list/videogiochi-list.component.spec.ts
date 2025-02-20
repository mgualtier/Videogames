import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideogiochiListComponent } from './videogiochi-list.component';

describe('VideogiochiListComponent', () => {
  let component: VideogiochiListComponent;
  let fixture: ComponentFixture<VideogiochiListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideogiochiListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideogiochiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
