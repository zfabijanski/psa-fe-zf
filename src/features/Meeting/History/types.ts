export interface IMeeting {
  meetingNo: string;
  meetingId: number;
  name: string;
  age?: number;
  lastAccessDate: Date;
  createDate: Date;
  statusId: number;
  statusName: string;
  statusDescription: string;
  state: string;
  haveAdequacy: boolean;
  haveCalculation: boolean;
  haveIdd: boolean;
}
