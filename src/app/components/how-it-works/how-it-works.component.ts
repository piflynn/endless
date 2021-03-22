import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { filter, map } from 'rxjs/operators';

import { DataService } from 'src/app/data.service';
import { StepResponseModel } from 'src/app/models/step-response.model';
import { StepViewModel } from 'src/app/models/step-view.model';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HowItWorksComponent implements OnInit {
  @Input() tablet = false;
  @Input() mobile = false;
  steps$ = this.dataService.getSteps$().pipe(
    filter((steps) => !!steps),
    map((steps) =>
      steps
        .map(this.mapVersionContent)
        .sort((a, b) => parseInt(a.stepNumber, 10) - parseInt(b.stepNumber, 10))
    )
  );
  constructor(private dataService: DataService) {}

  ngOnInit(): void {}
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
