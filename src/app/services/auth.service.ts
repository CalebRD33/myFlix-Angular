import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(this.getLoggedInStateFromStorage());

  isLoggedIn$ = this.loggedIn.asObservable();

  login(): void {
    this.loggedIn.next(true);
    localStorage.setItem('isLoggedIn', 'true');
  }

  logout(): void {
    this.loggedIn.next(false);
    localStorage.removeItem('isLoggedIn');
  }

  getLoggedInStateFromStorage(): boolean {
    if (typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true') {
      return true;
    }
    return false;
  }
}
