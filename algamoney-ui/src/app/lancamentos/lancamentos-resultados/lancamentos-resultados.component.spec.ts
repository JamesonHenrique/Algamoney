import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancamentosResultadosComponent } from './lancamentos-resultados.component';

describe('LancamentosResultadosComponent', () => {
  let component: LancamentosResultadosComponent;
  let fixture: ComponentFixture<LancamentosResultadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LancamentosResultadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LancamentosResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
