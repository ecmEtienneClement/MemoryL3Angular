import { Component } from '@angular/core';
import { RoutesNames } from 'src/routes/routes.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'cliniqueMemoryL3IDA';
  readonly routesName = RoutesNames;
}
