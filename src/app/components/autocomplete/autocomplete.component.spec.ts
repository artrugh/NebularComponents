import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Group } from 'src/app/Models';
import { AutocompleteComponent } from './autocomplete.component';

describe('AutocompleteComponent', () => {
  let component: AutocompleteComponent;
  let fixture: ComponentFixture<AutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutocompleteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('filter', () => {
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

    it('should return empty', () => {
      // @ts-expect-error private access
      const result = component.filter('112');
      const expectedResult: Group[] = [];
      expect(result).toEqual(expectedResult);
    });

    it('should filter categories', () => {
      // @ts-expect-error private access
      const result = component.filter('Volk');
      const expectedResult: Group[] = [
        {
          Volkswagen: ['Option 11', 'Option 12', 'Option 13'],
        },
      ];
      expect(result).toEqual(expectedResult);
    });

    it('should filter multiple Categories', () => {
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

    it('should filter trimmed input', () => {
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
  describe('multiInputFilter', () => {
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

    it('should filter multi input', () => {
      // @ts-expect-error private access
      const result = component.filter('Volkswagen 12');
      const expectedResult: Group[] = [
        {
          Volkswagen: ['Option 12'],
        },
      ];
      expect(result).toEqual(expectedResult);
    });

    it('should filter multi input test2', () => {
      // @ts-expect-error private access
      const result = component.filter('Volkswagen 1');
      const expectedResult: Group[] = [
        {
          Volkswagen: ['Option 11', 'Option 12', 'Option 13'],
        },
      ];
      expect(result).toEqual(expectedResult);
    });

    it('should filter multi input either way', () => {
      // @ts-expect-error private access
      const result = component.filter('1 Volkswagen');
      const expectedResult: Group[] = [
        {
          Volkswagen: ['Option 11', 'Option 12', 'Option 13'],
        },
      ];
      expect(result).toEqual(expectedResult);
    });

    it('should filter multi input for catagories', () => {
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

    it('should filter multi input new', () => {
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
