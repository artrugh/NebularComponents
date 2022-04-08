import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  OnInit,
  ElementRef,
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent implements OnInit {
  options!: string[];
  filteredOptions$!: Observable<string[]>;

  @ViewChild('autoInput') input!: ElementRef<HTMLInputElement>;

  ngOnInit() {
    this.options = ['Option 1', 'Option 2', 'Option 3'];
    this.filteredOptions$ = of(this.options);
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((optionValue) =>
      optionValue.toLowerCase().includes(filterValue)
    );
  }

  getFilteredOptions(value: string): Observable<string[]> {
    return of(value).pipe(map((filterString) => this.filter(filterString)));
  }

  onChange() {
    this.filteredOptions$ = this.getFilteredOptions(
      this.input.nativeElement.value
    );
  }

  onSelectionChange($event: string) {
    this.filteredOptions$ = this.getFilteredOptions($event);
  }
}
