import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequerimientoComponent } from './requerimiento.component'

describe('RequerimientoComponent', () => {
  let component: RequerimientoComponent;
  let fixture: ComponentFixture<RequerimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequerimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequerimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
