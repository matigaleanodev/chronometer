import { Component } from '@angular/core';
import { ChronometerComponent } from './chronometer/chronometer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [ChronometerComponent],
})
export class AppComponent {}
