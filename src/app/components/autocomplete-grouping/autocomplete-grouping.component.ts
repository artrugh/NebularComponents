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

  public getKey(obj: Group): string {
    return Object.keys(obj)[0];
  }

  public getValue(obj: Group): string[] {
    return Object.values(obj)[0];
  }

  private filterValue(obj: Group, filterValue: string): string[] {
    return this.getValue(obj).filter((optionValue) =>
      optionValue.toLowerCase().includes(filterValue)
    );
  }

  private filterKey(obj: Group, filterValue: string): boolean {
    return this.getKey(obj).toLowerCase().includes(filterValue);
  }

  private filter(value: string): Group[] {
    const filterValue = value.toLowerCase();

    return this.groups
      .map((group) => {
        if (this.filterKey(group, filterValue)) {
          return group;
        } else {
          const values = this.filterValue(group, filterValue);
          const key = this.getKey(group);

          return { [key]: values };
        }
      })
      .filter((group) => {
        return (
          this.filterKey(group, filterValue) ||
          this.filterValue(group, filterValue).length
        );
      });
  }
  trackByFn(_: string, item: Group) {
    return item;
  }
}
