import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private visible:boolean = false;
  private isVisibleSubject = new BehaviorSubject<boolean>(this.visible);
  private isVisible$ = this.isVisibleSubject.asObservable();
  selectedFormType = signal<string | null>(null);
  isEdit = signal<boolean>(false);

  constructor() { }
  
  showDialog():void {
    this.visible = true;
    this.isVisibleSubject.next(this.visible);
  }

  hideDialog():void {
    this.visible = false;
    this.isVisibleSubject.next(this.visible);
  }

  getVisibility():Observable<boolean> {
    return this.isVisible$;
  }
}
