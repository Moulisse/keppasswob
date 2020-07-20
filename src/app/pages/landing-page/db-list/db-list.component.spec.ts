import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {DbListComponent} from './db-list.component';

describe('DbListComponent', () => {
  let component: DbListComponent;
  let fixture: ComponentFixture<DbListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DbListComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DbListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
