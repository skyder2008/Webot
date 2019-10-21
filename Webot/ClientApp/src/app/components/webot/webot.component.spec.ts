import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebotComponent } from './webot.component';

describe('WebotComponent', () => {
  let component: WebotComponent;
  let fixture: ComponentFixture<WebotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
