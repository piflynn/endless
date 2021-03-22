import { BreakpointObserver } from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  mobile = false;
  tablet = false;
  destroy$ = new Subject();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.breakpointObserver
      .observe([
        '(max-width: 1439px)',
        '(max-width: 900px)',
        '(max-width: 600px)',
      ])
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        console.log(result);
        this.mobile = result.breakpoints['(max-width: 900px)'];
        this.tablet = result.breakpoints['(max-width: 1439px)'];
        this.changeDetectorRef.detectChanges();
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
