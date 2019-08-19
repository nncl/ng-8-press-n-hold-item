import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import { PressHoldDirective } from './directives/pressHold/press-hold.directive';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PressHoldDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
