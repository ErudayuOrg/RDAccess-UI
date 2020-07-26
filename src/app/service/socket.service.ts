import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket:any
  host:string = "http://localhost:5000/";
  constructor() {
    this.socket = io(this.host);
   }
   connectWhenLogin(userId){
    this.socket.emit('connectUser', {userId});
   }

   disconnectWhenLogout(userId){
    this.socket.emit('disconnectUser', {userId});
   }

  getNotification() {
    return Observable.create(observer => {
      this.socket.on('notifyAdmin', data => {
        observer.next(data.message);
      });
    });
  }

}
