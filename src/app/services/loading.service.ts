import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class LoadingService {

  private loader = new BehaviorSubject<string>('');
  constructor() { }

  getLoaderObserver(): Observable<string> {
    return this.loader.asObservable();
  }

  requestStarted() {
      this.loader.next('start');
  }

  requestEnded() {
      this.loader.next('stop');
  }
}