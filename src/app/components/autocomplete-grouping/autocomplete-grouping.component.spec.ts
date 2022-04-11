import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteGroupingComponent, Group } from './autocomplete-grouping.component';

describe('AutocompleteGroupingComponent', () => {
  let component: AutocompleteGroupingComponent;
  let fixture: ComponentFixture<AutocompleteGroupingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutocompleteGroupingComponent]
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
        }];
    })

    it('should filter items', () => {
      // @ts-expect-error private access
      const result = component.filter("11");
      const expectedResult = [{
        Volkswagen: ['Option 11'],
      }]
      expect(result).toEqual(expectedResult)
    });

    it('should return empty', () => {
      // @ts-expect-error private access
      const result = component.filter("112");
      const expectedResult: Group[] = []
      expect(result).toEqual(expectedResult)
    });

    it('should filter categories', () => {
      // @ts-expect-error private access
      const result = component.filter("Volk");
      const expectedResult: Group[] = [{
        Volkswagen: ['Option 11', 'Option 12', 'Option 13'],
      }
      ]
      expect(result).toEqual(expectedResult)
    });

    it('should filter multiple Categories', () => {
      // @ts-expect-error private access
      const result = component.filter("Vol");
      const expectedResult: Group[] = [{
        Volkswagen: ['Option 11', 'Option 12', 'Option 13'],
      },
      {
        Volvo: ['Option 31', 'Option 32', 'Option 33'],
      }
      ]
      expect(result).toEqual(expectedResult)
    });

    it('should filter trimmed input', () => {
      // @ts-expect-error private access
      const result = component.filter("     11      ");
      const expectedResult = [{

        Volkswagen: ['Option 11'],
      }]
      expect(result).toEqual(expectedResult)
    });
  })
});
