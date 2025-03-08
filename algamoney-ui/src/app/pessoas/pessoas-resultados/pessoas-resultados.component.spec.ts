import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoasResultadosComponent } from './pessoas-resultados.component';

describe('PessoasResultadosComponent', () => {
  let component: PessoasResultadosComponent;
  let fixture: ComponentFixture<PessoasResultadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PessoasResultadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PessoasResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
