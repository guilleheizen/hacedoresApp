import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccionesPage } from './acciones.page';

describe('Tab1Page', () => {
  let component: AccionesPage;
  let fixture: ComponentFixture<AccionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccionesPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
