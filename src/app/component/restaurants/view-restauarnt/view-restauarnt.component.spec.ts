import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRestauarntComponent } from './view-restauarnt.component';

describe('ViewRestauarntComponent', () => {
  let component: ViewRestauarntComponent;
  let fixture: ComponentFixture<ViewRestauarntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewRestauarntComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewRestauarntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
