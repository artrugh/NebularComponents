import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable, of } from 'rxjs';

import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Group } from 'src/app/types';

@Component({
  selector: 'app-autocomplete-grouping',
  templateUrl: './autocomplete-grouping.component.html',
  styleUrls: ['./autocomplete-grouping.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteGroupingComponent implements OnInit {
  @Input() groups!: Group[];
  filteredGroups$!: Observable<Group[]>;
  inputFormControl!: FormControl;

  ngOnInit() {
    this.filteredGroups$ = of(this.groups);
    this.inputFormControl = new FormControl();

    this.filteredGroups$ = this.inputFormControl.valueChanges.pipe(
      startWith(''),
      map((inputValue) => this.filter(inputValue))
    );
  }

  public getGroupKey(obj: Group): string {
    return Object.keys(obj)[0];
  }

  public getGroupArray(obj: Group): string[] {
    return Object.values(obj)[0];
  }

  private filterValues(group: Group, inputValue: string): string[] {
    return this.getGroupArray(group).filter((value) =>
      this.isInputValueIncluded(value, inputValue)
    );
  }

  private isInputValueIncluded(source: string, inputValue: string): boolean {
    return source.toLowerCase().includes(inputValue);
  }

  private filterGroups(groups: Group[], inputValue: string): Group[] {
    return groups
      .map((group) => {
        if (this.isInputValueIncluded(this.getGroupKey(group), inputValue)) {
          return group;
        } else {
          const values = this.filterValues(group, inputValue);
          const key = this.getGroupKey(group);

          return { [key]: values };
        }
      })
      .filter((group) => {
        return (
          this.isInputValueIncluded(this.getGroupKey(group), inputValue) ||
          this.filterValues(group, inputValue).length
        );
      });
  }

  private filter(inputValue: string): Group[] {
    const lowerCaseInputValues = inputValue.toLowerCase().trim().split(' ');
    let filteredGroups: Group[] = this.groups;
    lowerCaseInputValues.forEach(
      (value) =>
        (filteredGroups = this.filterGroups(filteredGroups, value.trim()))
    );
    return filteredGroups;
  }
}
