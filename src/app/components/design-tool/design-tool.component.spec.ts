import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignToolComponent } from './design-tool.component';

describe('DesignListComponent', () => {
  let component:  DesignToolComponent;
  let fixture: ComponentFixture< DesignToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DesignToolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent( DesignToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
