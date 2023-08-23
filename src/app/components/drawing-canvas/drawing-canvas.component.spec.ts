import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingCanvasComponent } from './drawing-canvas.component';

describe('DrawingCanvasComponent', () => {
  let component: DrawingCanvasComponent;
  let fixture: ComponentFixture<DrawingCanvasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DrawingCanvasComponent]
    });
    fixture = TestBed.createComponent(DrawingCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
