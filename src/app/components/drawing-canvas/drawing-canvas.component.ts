import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { io, Socket } from 'socket.io-client'; 

@Component({
  selector: 'app-drawing-canvas',
  templateUrl: './drawing-canvas.component.html',
  styleUrls: ['./drawing-canvas.component.css']
})
export class DrawingCanvasComponent implements OnInit{
  private socket!: Socket;
  @ViewChild('canvas') canvasRef!: ElementRef;
  private ctx!: CanvasRenderingContext2D;
  private drawing = false;

  ngOnInit(): void {
    const socketInstance = io('https://socket-server-djr1.onrender.com/',{

    // const socketInstance = io('http://localhost:3000',{
      withCredentials:true
    }); // Initialize the socket
    this.socket = socketInstance;

    this.socket.on('connect', () => {
      console.log('Connected to server');
    });

    this.socket.on('drawing', (data) => {
      if (data.type === 'start') {
        this.drawing = true;
        this.ctx.beginPath();
        this.ctx.moveTo(data.x, data.y);
      } else if (data.type === 'draw' && this.drawing) {
        this.ctx.lineTo(data.x, data.y);
        this.ctx.stroke();
      } else if (data.type === 'end' && this.drawing) {
        this.drawing = false;
        this.ctx.lineTo(data.x, data.y);
        this.ctx.stroke();
        this.ctx.closePath();
      }
    });
  }

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 800;

    canvas.addEventListener('mousedown', (e:any) => this.startDrawing(e));
    canvas.addEventListener('mousemove', (e:any) => this.draw(e));
    canvas.addEventListener('mouseup', () => this.endDrawing());
    canvas.addEventListener('mouseout', () => this.endDrawing());
  }

  private startDrawing(e: MouseEvent): void {
    this.drawing = true;
    const { offsetX, offsetY } = e;
    this.ctx.beginPath();
    this.ctx.moveTo(offsetX, offsetY);
    this.socket.emit('drawing', { type: 'start', x: offsetX, y: offsetY });
  }

  private draw(e: MouseEvent): void {
    if (!this.drawing) return;
    const { offsetX, offsetY } = e;
    this.ctx.lineTo(offsetX, offsetY);
    this.ctx.stroke();
    this.socket.emit('drawing', { type: 'draw', x: offsetX, y: offsetY });
  }


  private endDrawing(): void {
    if (!this.drawing) return;
    this.drawing = false;
    this.ctx.closePath();
    this.socket.emit('drawing', { type: 'end' });
  }

  
}
