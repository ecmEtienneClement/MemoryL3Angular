import { Component, Input, OnInit } from '@angular/core';
import { StateApp } from 'src/app/core/ngrx/Entities.state';
@Component({
  selector: 'app-loading-cmp',
  templateUrl: './loading-cmp.component.html',
  styleUrls: ['./loading-cmp.component.scss'],
})
export class LoadingCmpComponent implements OnInit {
  @Input() dataState: StateApp = StateApp.initiale;
  @Input() notification: string[] = [];
  @Input() errorMessage: any[] = [];
  readonly dataStateEnum = StateApp;
  //
  isNotification: boolean = true;
  isInitial: boolean = true;

  ngOnInit() {}

  //
  getNotification(): string {
    setTimeout(() => {
      this.isNotification = false;
    }, 2500);
    return this.notification[0] ? this.notification[0] : '';
  }

  //
  getInitial(): string {
    setTimeout(() => {
      this.isInitial = false;
    }, 2500);
    return 'Etat Initiale!';
  }
}
