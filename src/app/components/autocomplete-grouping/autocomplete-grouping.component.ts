import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

export interface Group {
  [key: string]: string[];
}

@Component({
  selector: 'app-autocomplete-grouping',
  templateUrl: './autocomplete-grouping.component.html',
  styleUrls: ['./autocomplete-grouping.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteGroupingComponent implements OnInit {
  groups!: Group[];
  filteredGroups$!: Observable<Group[]>;
  inputFormControl!: FormControl;

  ngOnInit() {
    this.groups = [
      {
        cars: ['Option 11', 'Option 12', 'Option 13'],
      },
      {
        motors: ['Option 21', 'Option 22', 'Option 23'],
      },
      {
        bicky: ['Option 31', 'Option 32', 'Option 33'],
      },
    ];

    this.filteredGroups$ = of(this.groups);
    this.inputFormControl = new FormControl();

    this.filteredGroups$ = this.inputFormControl.valueChanges.pipe(
      startWith(''),
      map((filterString) => this.filter(filterString))
    );
  }

  public getGroupKey(obj: Group): string {
    return Object.keys(obj)[0];
  }

  public getGroupArray(obj: Group): string[] {
    return Object.values(obj)[0];
  }

  private filterValues(obj: Group, filterValue: string): string[] {
    return this.getGroupArray(obj).filter((optionValue) =>
      this.isStringIncluded(optionValue, filterValue)
    );
  }

  private isStringIncluded(source: string, value: string): boolean {
    return source.toLowerCase().includes(value.toLowerCase());
  }

  private filter(input: string): Group[] {
    const lowerCaseInput = input.toLowerCase().trim();

    return this.groups
      .map((group) => {
        if (this.isStringIncluded(this.getGroupKey(group), lowerCaseInput)) {
          return group;
        } else {
          const filteredValues = this.filterValues(group, lowerCaseInput);
          const key = this.getGroupKey(group);

          return { [key]: filteredValues };
        }
      })
      .filter((group) => {
        return (
          this.isStringIncluded(this.getGroupKey(group), lowerCaseInput) ||
          this.filterValues(group, lowerCaseInput).length
        );
      });
  }

  trackByFn(_: string, item: Group) {
    return item;
  }
}
