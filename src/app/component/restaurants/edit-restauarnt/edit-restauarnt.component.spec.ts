import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRestauarntComponent } from './edit-restauarnt.component';

describe('EditRestauarntComponent', () => {
  let component: EditRestauarntComponent;
  let fixture: ComponentFixture<EditRestauarntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditRestauarntComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditRestauarntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
