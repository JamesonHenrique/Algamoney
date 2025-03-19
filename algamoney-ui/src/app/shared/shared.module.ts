import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages/messages.component';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [MessagesComponent, ModalDeleteComponent, PaginationComponent],
  imports: [CommonModule],
  exports: [MessagesComponent, ModalDeleteComponent, PaginationComponent],
})
export class SharedModule {}
