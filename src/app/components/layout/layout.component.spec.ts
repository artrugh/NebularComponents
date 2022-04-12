import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Group, ServiceCardBase } from "src/app/Models";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [LayoutComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('GroupDataByDebitorName', () => {
    let servicecards: ServiceCardBase[];
    beforeEach(() => {
      servicecards = [
        {
          KapschCardId: "SC/1000012",
          DebitorName: "Volkswagen",
          CurrentPointsValue: 0,
          DebitorNr: "",
          ExpiryDate: new Date(),
          StartDate: new Date(),
          FillingLevelOverall: 0,
          State: "",
          TechnologyId: "",
          TotalPointsPurchased: 0
        },
        {
          KapschCardId: "SC/1000123",
          DebitorName: "Volkswagen",
          CurrentPointsValue: 0,
          DebitorNr: "",
          ExpiryDate: new Date(),
          StartDate: new Date(),
          FillingLevelOverall: 0,
          State: "",
          TechnologyId: "",
          TotalPointsPurchased: 0
        },
        {
          KapschCardId: "SC/1002312",
          DebitorName: "Mercedes - AMG",
          CurrentPointsValue: 0,
          DebitorNr: "",
          ExpiryDate: new Date(),
          StartDate: new Date(),
          FillingLevelOverall: 0,
          State: "",
          TechnologyId: "",
          TotalPointsPurchased: 0
        }
      ]
    })

    it('should create a Group[]', () => {
      const key = "Mercedes - AMG";
      const expectedResult:Group[] = [
        { Volkswagen: ["SC/1000012", "SC/1000123"] },
        { [key]: ["SC/1002312"] }
      ]
      // @ts-expect-error private access
      const result = component.getGroupedKapschCardIdByDebitorName(servicecards);
      expect(result).toEqual(expectedResult);
    })

    it('should create a empty Group[]', () => {
      const expectedResult:Group[] = []
      // @ts-expect-error private access
      const result = component.getGroupedKapschCardIdByDebitorName([]);
      expect(result).toEqual(expectedResult);
    })
  })
});
