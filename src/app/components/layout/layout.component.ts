import { Component, OnInit } from '@angular/core';
import { Group, ServiceCardBase } from "src/app/Models";
import { DataServiceService } from "src/app/services/data-service.service";



@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public groups: Group[] = [];
  constructor(private readonly dataService: DataServiceService) { }

  ngOnInit(): void {
    this.dataService.getServiceCards().subscribe(data => {
      this.groups = this.getGroupedKapschCardIdByDebitorName(data.value);
    })
  }

  private getGroupedKapschCardIdByDebitorName(cards: ServiceCardBase[]): Group[] {
    const groupsArray: Group[] = [];
    const groups: Group = {};
    cards.forEach(card => {
      if (groups[card.DebitorName]) {
        groups[card.DebitorName] = [...groups[card.DebitorName], card.KapschCardId];
      } else {
        groups[card.DebitorName] = [card.KapschCardId];
      }
    })
    Object.entries(groups).forEach(entry => {
      groupsArray.push({ [entry[0]]: entry[1] })
    });
    return groupsArray;
  }
}
