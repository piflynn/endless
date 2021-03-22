import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowItWorksComponent } from './how-it-works.component';

describe('HowItWorksComponent', () => {
  let component: HowItWorksComponent;
  let fixture: ComponentFixture<HowItWorksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HowItWorksComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HowItWorksComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render steps properly', () => {
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
