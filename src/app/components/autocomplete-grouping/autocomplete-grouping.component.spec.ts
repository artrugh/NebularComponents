import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Group } from 'src/app/types';

import { AutocompleteGroupingComponent } from './autocomplete-grouping.component';

describe('AutocompleteGroupingComponent', () => {
  let component: AutocompleteGroupingComponent;
  let fixture: ComponentFixture<AutocompleteGroupingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutocompleteGroupingComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteGroupingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('Filter method', () => {
    describe('Simple-input value', () => {
      beforeEach(() => {
        component.groups = [
          {
            Volkswagen: ['Option 11', 'Option 12', 'Option 13'],
          },
          {
            Mercedes: ['Option 21', 'Option 22', 'Option 23'],
          },
          {
            Volvo: ['Option 31', 'Option 32', 'Option 33'],
          },
        ];
      });

      it('should filter items', () => {
        // @ts-expect-error private access
        const result = component.filter('11');
        const expectedResult = [
          {
            Volkswagen: ['Option 11'],
          },
        ];
        expect(result).toEqual(expectedResult);
      });

      it('should return empty array if it does not match a result', () => {
        // @ts-expect-error private access
        const result = component.filter('112');
        const expectedResult: Group[] = [];
        expect(result).toEqual(expectedResult);
      });

      it('should return property key match', () => {
        // @ts-expect-error private access
        const result = component.filter('Volk');
        const expectedResult: Group[] = [
          {
            Volkswagen: ['Option 11', 'Option 12', 'Option 13'],
          },
        ];
        expect(result).toEqual(expectedResult);
      });

      it('should return property keys matches', () => {
        // @ts-expect-error private access
        const result = component.filter('Vol');
        const expectedResult: Group[] = [
          {
            Volkswagen: ['Option 11', 'Option 12', 'Option 13'],
          },
          {
            Volvo: ['Option 31', 'Option 32', 'Option 33'],
          },
        ];
        expect(result).toEqual(expectedResult);
      });

      it('should trim input', () => {
        // @ts-expect-error private access
        const result = component.filter('     11      ');
        const expectedResult = [
          {
            Volkswagen: ['Option 11'],
          },
        ];
        expect(result).toEqual(expectedResult);
      });
    });

    describe('Multi-input values', () => {
      beforeEach(() => {
        component.groups = [
          {
            Volkswagen: ['Option 11', 'Option 12', 'Option 13'],
          },
          {
            Mercedes: ['Option 11', 'Option 21', 'Option 23'],
          },
          {
            Volvo: ['Option 11', 'Option 12', 'Option 13', 'Option 21'],
          },
        ];
      });

      it('should return one match', () => {
        // @ts-expect-error private access
        const result = component.filter('Volkswagen 12');
        const expectedResult: Group[] = [
          {
            Volkswagen: ['Option 12'],
          },
        ];
        expect(result).toEqual(expectedResult);
      });

      it('should return multiple matches', () => {
        // @ts-expect-error private access
        const result = component.filter('Volkswagen 1');
        const expectedResult: Group[] = [
          {
            Volkswagen: ['Option 11', 'Option 12', 'Option 13'],
          },
        ];
        expect(result).toEqual(expectedResult);
      });

      it('should filter either way', () => {
        // @ts-expect-error private access
        const result = component.filter('1 Volkswagen');
        const expectedResult: Group[] = [
          {
            Volkswagen: ['Option 11', 'Option 12', 'Option 13'],
          },
        ];
        expect(result).toEqual(expectedResult);
      });

      it('should return multiple property keys matches', () => {
        // @ts-expect-error private access
        const result = component.filter('Vol 12');
        const expectedResult: Group[] = [
          {
            Volkswagen: ['Option 12'],
          },
          {
            Volvo: ['Option 12'],
          },
        ];
        expect(result).toEqual(expectedResult);
      });

      it('should filter either way and return multiple property keys matches', () => {
        // @ts-expect-error private access
        const result = component.filter('1 2 Vol');
        const expectedResult: Group[] = [
          {
            Volkswagen: ['Option 12'],
          },
          { Volvo: ['Option 12', 'Option 21'] },
        ];
        expect(result).toEqual(expectedResult);
      });
    });
  });
});
