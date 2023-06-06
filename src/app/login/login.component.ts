import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, StateApp } from '../core/ngrx/Entities.state';
import { RoutesNames } from '../core/routes/routes.config';
import { EntitiesEmit } from '../core/serviceEntities/EntitiesEmit';
import {
  PersonnelsActions,
  PersonnelsSelectors,
} from '../personnels/ngrx/Personnels.ngrx';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  stateApp: StateApp = StateApp.initiale;

  notification: string[] = [];
  errorMessage: string[] = [];
  readonly routesName = RoutesNames;
  creatAdmin: boolean = false;

  //
  formLogin!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private store: Store<AppState>,
    private personnelsActions: PersonnelsActions,
    private personnelsSelectors: PersonnelsSelectors
  ) {}
  //
  ngOnInit() {
    this.initForm();
    this.store.dispatch(this.personnelsActions.getAllEntities()());
    this.store.select(this.personnelsSelectors.getEntities()).subscribe({
      next: (data) => {
        if (data) {
          if (data.length == 0) {
            this.creatAdmin = true;
          } else {
            this.creatAdmin = false;
          }
        }
      },
    });
  }
  //
  initForm() {
    this.formLogin = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  submitForm() {
    this.stateApp = StateApp.loading;
    const formPersonnel = this.formLogin.value;
    const email: string = formPersonnel.email;
    const password: string = formPersonnel.password;
    this.loginService.signInEntitie(email, password).subscribe({
      next: (data) => {
        if (data) {
          localStorage.setItem('idProfil', data.id);
          localStorage.setItem('token', data.token);
          this.stateApp = StateApp.loaded;
          EntitiesEmit.emitLogin(true);
          this.router.navigate([this.routesName.mPatient.patients]);
        }
      },
      error: (error) => {
        this.stateApp = StateApp.error;
        this.errorMessage = [error];
      },
    });
  }
 
}
