import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  private userRole: string | null = null; // Variável para armazenar a role do usuário

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    const allowedRoles = route.data['roles'] || []; // Obtém as roles permitidas

  
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (!user) {
          this.router.navigate(['/auth/signin']);
          return of(false);
        } else {
          const uid = user.uid;

          return this.firestore.collection('users', ref => ref.where('userId', '==', uid)).get().pipe(
            map(querySnapshot => {
              if (querySnapshot.empty) {
                this.router.navigate(['/route-not-authorized']);
                return false;
              }

              const doc = querySnapshot.docs[0];
              const data = doc.data() as UserData | undefined;
              this.userRole = data?.role || null; // Armazena a role do usuário

              console.log(this.userRole);
              

              if (!allowedRoles.includes(this.userRole!)) {
                this.router.navigate(['/route-not-authorized']);
                return false; // Usuário não tem a role permitida
              }
              
              return allowedRoles.includes(this.userRole!); // Retorna true ou false baseado na role
            }),
            catchError(() => {
              this.router.navigate(['/auth/signin']);
              return of(false);
            })
          );
        }
      })
    );
  }

  getRole(): string | null {
    return this.userRole; // Método para acessar a role do usuário
  }
  
}


interface UserData {
  name?: string;
  email?: string;
  role?: string;
  userId?: string; // Campo que armazena o UID do usuário no documento
}


