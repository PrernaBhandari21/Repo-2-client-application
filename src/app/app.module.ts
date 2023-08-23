import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DrawingCanvasComponent } from './components/drawing-canvas/drawing-canvas.component';
import { SecondPageComponent } from './components/second-page/second-page.component';

@NgModule({
  declarations: [
    AppComponent,
    DrawingCanvasComponent,
    SecondPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
