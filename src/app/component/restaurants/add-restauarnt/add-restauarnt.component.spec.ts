import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRestauarntComponent } from './add-restauarnt.component';

describe('AddRestauarntComponent', () => {
  let component: AddRestauarntComponent;
  let fixture: ComponentFixture<AddRestauarntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddRestauarntComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddRestauarntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
