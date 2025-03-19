import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoasCadastroContatoComponent } from './pessoas-cadastro-contato.component';

describe('PessoasCadastroContatoComponent', () => {
  let component: PessoasCadastroContatoComponent;
  let fixture: ComponentFixture<PessoasCadastroContatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PessoasCadastroContatoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PessoasCadastroContatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
