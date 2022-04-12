import { Component, OnInit } from '@angular/core';
import { Group, ServiceCardBase } from 'src/app/types';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  public groups: Group[] = [];
  constructor(private readonly dataService: DataServiceService) {}

  private dummyGroups: Group[] = [
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

  ngOnInit(): void {
    this.dataService.getServiceCards().subscribe(
      (data) => {
        this.groups = this.getGroupedKapschCardIdByDebitorName(data.value);
      },
      () => {
        this.groups = this.dummyGroups;
      }
    );
  }

  private getGroupedKapschCardIdByDebitorName(
    cards: ServiceCardBase[]
  ): Group[] {
    const groupsArray: Group[] = [];
    const groups: Group = {};
    cards.forEach((card) => {
      if (groups[card.DebitorName]) {
        groups[card.DebitorName] = [
          ...groups[card.DebitorName],
          card.KapschCardId,
        ];
      } else {
        groups[card.DebitorName] = [card.KapschCardId];
      }
    });
    Object.entries(groups).forEach((entry) => {
      groupsArray.push({ [entry[0]]: entry[1] });
    });
    return groupsArray;
  }
}
