import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteGroupingComponent } from './autocomplete-grouping.component';

describe('AutocompleteGroupingComponent', () => {
  let component: AutocompleteGroupingComponent;
  let fixture: ComponentFixture<AutocompleteGroupingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutocompleteGroupingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteGroupingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
