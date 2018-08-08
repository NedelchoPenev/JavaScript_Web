/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AllPhotographersComponent } from './all-photographers.component';

describe('AllPhotographersComponent', () => {
  let component: AllPhotographersComponent;
  let fixture: ComponentFixture<AllPhotographersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPhotographersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPhotographersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
