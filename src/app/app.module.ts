import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { GetStartedComponent } from './components/get-started/get-started.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GetStartedComponent,
    HowItWorksComponent,
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
