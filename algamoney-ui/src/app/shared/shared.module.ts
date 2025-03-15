

import { NgModule , NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages/messages.component';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';




@NgModule({
  declarations: [
    MessagesComponent,
    ModalDeleteComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MessagesComponent,
    ModalDeleteComponent
  ],
})
export class SharedModule { }
