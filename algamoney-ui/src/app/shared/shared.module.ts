import { NgModule , NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages/messages.component';



@NgModule({
  declarations: [
    MessagesComponent, // Declarando o MessagesComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MessagesComponent, // Exportando o MessagesComponent para ser usado em outros módulos
  ],
})
export class SharedModule { }
