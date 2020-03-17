import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {DbHomePage} from './db-home.page';

describe('HomePage', () => {
  let component: DbHomePage;
  let fixture: ComponentFixture<DbHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DbHomePage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DbHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
