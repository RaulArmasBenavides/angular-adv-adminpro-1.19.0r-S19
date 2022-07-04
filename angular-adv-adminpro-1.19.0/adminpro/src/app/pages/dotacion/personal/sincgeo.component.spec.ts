import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SincgeoComponent } from './sincgeo.component';

describe('SincgeoComponent', () => {
  let component: SincgeoComponent;
  let fixture: ComponentFixture<SincgeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SincgeoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SincgeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
