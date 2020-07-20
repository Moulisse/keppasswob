import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {FavOptionsComponent} from './fav-options.component';

describe('FavOptionsComponent', () => {
  let component: FavOptionsComponent;
  let fixture: ComponentFixture<FavOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FavOptionsComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FavOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
