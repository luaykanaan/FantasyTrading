/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PairCardComponent } from './pair-card.component';

describe('PairCardComponent', () => {
  let component: PairCardComponent;
  let fixture: ComponentFixture<PairCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PairCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PairCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
