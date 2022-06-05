import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoVotacionesPage } from './juego-votaciones.page';

describe('JuegoVotacionesPage', () => {
  let component: JuegoVotacionesPage;
  let fixture: ComponentFixture<JuegoVotacionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JuegoVotacionesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JuegoVotacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
