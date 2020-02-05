import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerAccionComponent } from './ver-accion.component';

describe('VerAccionComponent', () => {
  let component: VerAccionComponent;
  let fixture: ComponentFixture<VerAccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerAccionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerAccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
