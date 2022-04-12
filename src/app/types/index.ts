export interface ServiceCardBase {
    KapschCardId: string;
    StartDate: Date;
    ExpiryDate: Date;
    State: string;
    CurrentPointsValue: number;
    TotalPointsPurchased: number;
    FillingLevelOverall: number;
    DebitorNr: string;
    DebitorName: string;
    TechnologyId: string;
}

export interface ODataResponse<T> {
    "@odata.context": string;
    "@odata.count"?: number;
    value: T;
}

export interface Group {
    [key: string]: string[];
  }