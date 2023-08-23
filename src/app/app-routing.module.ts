import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrawingCanvasComponent } from './components/drawing-canvas/drawing-canvas.component';
import { SecondPageComponent } from './components/second-page/second-page.component';

const routes: Routes = [
  {
    path:'',
    component:DrawingCanvasComponent
  },
  {
    path:'second-page',
    component:SecondPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
