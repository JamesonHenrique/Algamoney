import { NgModule , NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages/messages.component';



@NgModule({
  declarations: [
    MessagesComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MessagesComponent,
  ],
})
export class SharedModule { }
