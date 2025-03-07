import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancamentosCadastroComponent } from './lancamentos-cadastro.component';

describe('LancamentosCadastroComponent', () => {
  let component: LancamentosCadastroComponent;
  let fixture: ComponentFixture<LancamentosCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LancamentosCadastroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LancamentosCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
