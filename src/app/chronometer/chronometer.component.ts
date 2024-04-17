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
  private counterObservable = interval(1000);
  private counterSubscription$: Subscription | undefined;

  count = signal<number>(0);
  running = signal<boolean>(false);

  start() {
    if (!this.running()) {
      this.running.set(true);
      this.counterSubscription$ = this.counterObservable.subscribe({
        next: () => {
          this.count.update((count) => count + 1000);
        },
      });
    }
  }

  stop() {
    this.running.set(false);
    this.counterSubscription$?.unsubscribe();
  }

  reset() {
    this.count.set(0);
  }
}
