import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RoutesNames } from '../core/routes/routes.config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  //
  readonly routesName = RoutesNames;
  constructor(private router: Router) {}

  //
  ngOnInit() {}

  nav(index: number) {
    const customRoute = [
      this.routesName.mHome.homeConsultation,
      this.routesName.mHome.homeOrdonnance,
      this.routesName.mHome.homePayement,
      this.routesName.mHome.homeRendezVous,
    ];
    //
    this.router.navigate([
      `${this.routesName.mHome.home}/${customRoute[index]}`,
    ]);
  }
}
