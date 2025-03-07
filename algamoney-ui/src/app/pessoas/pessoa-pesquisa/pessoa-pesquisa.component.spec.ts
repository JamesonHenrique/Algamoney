import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaPesquisaComponent } from './pessoa-pesquisa.component';

describe('PessoaPesquisaComponent', () => {
  let component: PessoaPesquisaComponent;
  let fixture: ComponentFixture<PessoaPesquisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PessoaPesquisaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PessoaPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
