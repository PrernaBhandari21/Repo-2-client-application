import { Component, OnInit } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.css']
})
export class SecondPageComponent implements OnInit{

  private socket!: Socket

  ngOnInit(): void {
    // const socketInstance = io('http://localhost:3000')

    const socketInstance = io('https://socket-server-djr1.onrender.com/')

    this.socket = socketInstance;

    this.socket.on('connect',()=>{
      console.log("connected to this also!");
    })

    this.socket.on('drawing',(data)=>{
      //we will apply the received drawing action on the canvas to get the same drawing as of in page1
      this.applyDrawingAction(data);
    })
  }


  applyDrawingAction(action:any){

    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    
    const context:any = canvas.getContext('2d');
  
    if (action.type === 'start') {
      context.beginPath();
      context.moveTo(action.x, action.y);
      context.lineWidth = action.lineWidth;
      context.strokeStyle = action.strokeStyle;
    } else if (action.type === 'draw') {
      context.lineTo(action.x, action.y);
      context.stroke();
    } else if (action.type === 'end') {
      context.closePath();
    }
  }
}
