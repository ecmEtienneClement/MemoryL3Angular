import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RoutesNames } from 'src/app/core/routes/routes.config';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { EntitiesEmit } from './core/serviceEntities/EntitiesEmit';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  idProfil!: string | null;
  isLogin: boolean = false;
  sub: Subscription = new Subscription();
  title = 'cliniqueMemoryL3IDA';
  readonly routesName = RoutesNames;
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.getIdProfil();
    this.loginSub();

    const token = localStorage.getItem('token');

    //
    if (token == null || token == '') {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }
    //
  }

  // ######
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  //
  getIdProfil() {
    this.idProfil = localStorage.getItem('idProfil');
  }
  //
  loginSub() {
    this.sub.add(
      EntitiesEmit.loginSub.subscribe({
        next: (data) => {
          if (data) {
            this.isLogin = true;
            this.getIdProfil();
          } else {
            this.isLogin = false;
            this.getIdProfil();
          }
        },
      })
    );
  }
  logOut() {
      this.isLogin = false;
    localStorage.clear();
    this.router.navigate([RoutesNames.mLogin.login]);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
