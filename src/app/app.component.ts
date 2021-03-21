import { BreakpointObserver } from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

import { DataService } from './data.service';
import { StepResponseModel } from './models/step-response.model';
import { StepViewModel } from './models/step-view.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  mobile = false;
  tablet = false;
  destroy$ = new Subject();
  steps$ = this.dataService.getSteps$().pipe(
    filter((steps) => !!steps),
    map((steps) =>
      steps
        .map(this.mapVersionContent)
        .sort((a, b) => parseInt(a.stepNumber, 10) - parseInt(b.stepNumber, 10))
    )
  );

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private breakpointObserver: BreakpointObserver,
    private dataService: DataService
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

  // finds latest content from versionContent and maps to StepViewModel
  private mapVersionContent(step: StepResponseModel): StepViewModel {
    const content = step.versionContent.reduce((a, b) =>
      new Date(a.effectiveDate) > new Date(b.effectiveDate) ? a : b
    );
    return {
      stepNumber: step.stepNumber,
      title: content.title,
      body: content.body,
    };
  }
}
