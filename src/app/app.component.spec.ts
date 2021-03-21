import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { MockDataService } from './testing/mock-data.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientTestingModule],
      declarations: [AppComponent],
      providers: [{ provide: DataService, useClass: MockDataService }],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render steps properly', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const appElement: HTMLElement = fixture.nativeElement;
    // correct number of steps
    expect(appElement.querySelectorAll('.step-number')?.length).toBe(4);
    // correct order
    expect(appElement.querySelectorAll('.step-number')[0]?.textContent).toBe(
      '01'
    );
    expect(appElement.querySelectorAll('.step-number')[3]?.textContent).toBe(
      '04'
    );
    // correct version content
    expect(appElement.querySelectorAll('.step-details')[2]?.textContent).toBe(
      'Tell us “no thanks” by returning any unwanted products in the enclosed packaging.'
    );
  });
});
