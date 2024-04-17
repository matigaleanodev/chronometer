import { DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'chronometer',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './chronometer.component.html',
  styleUrl: './chronometer.component.scss',
})
export class ChronometerComponent {
  private counterObservable = interval(1);
  private counterSubscription$: Subscription | undefined;

  count = signal<number>(0);
  running = signal<boolean>(false);

  start() {
    if (!this.running()) {
      this.counterSubscription$ = this.counterObservable.subscribe({
        next: () => {
          this.running.set(true);
          this.count.update((count) => count + 1);
        },
      });
    }
  }

  stop() {
    this.running.set(false);
    this.counterSubscription$?.unsubscribe();
  }

  reset() {
    this.count = signal<number>(0);
  }
}
