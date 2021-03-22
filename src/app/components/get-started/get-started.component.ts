import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GetStartedComponent implements OnInit {
  @Input() tablet = false;
  @Input() mobile = false;
  constructor() {}

  ngOnInit(): void {}
}
