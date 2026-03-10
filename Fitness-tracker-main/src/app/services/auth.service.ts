import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(true); // Default true for demo
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private currentUserIdSubject = new BehaviorSubject<string | null>('user1'); // Default user
  public currentUserId$ = this.currentUserIdSubject.asObservable();

  constructor() {
    this.loadAuthState();
  }

  /**
   * Load authentication state from localStorage
   */
  private loadAuthState(): void {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedUserId = localStorage.getItem('currentUserId');
    
    if (storedAuth !== null) {
      this.isAuthenticatedSubject.next(JSON.parse(storedAuth));
    }
    
    if (storedUserId) {
      this.currentUserIdSubject.next(storedUserId);
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  /**
   * Get current user ID
   */
  getCurrentUserId(): string | null {
    return this.currentUserIdSubject.value;
  }

  /**
   * Login user (simulated)
   */
  login(userId: string): Observable<boolean> {
    const authenticated = true;
    this.isAuthenticatedSubject.next(authenticated);
    this.currentUserIdSubject.next(userId);
    localStorage.setItem('isAuthenticated', JSON.stringify(authenticated));
    localStorage.setItem('currentUserId', userId);
    return this.isAuthenticated$;
  }

  /**
   * Logout user
   */
  logout(): void {
    this.isAuthenticatedSubject.next(false);
    this.currentUserIdSubject.next(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUserId');
  }

  /**
   * Toggle authentication for demo purposes
   */
  toggleAuth(): void {
    const newAuthState = !this.isAuthenticatedSubject.value;
    this.isAuthenticatedSubject.next(newAuthState);
    localStorage.setItem('isAuthenticated', JSON.stringify(newAuthState));
  }
}
