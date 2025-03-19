import { NgModule } from '@angular/core';
import { ServerModule, provideServerRendering } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  providers: [
    provideServerRendering()
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}