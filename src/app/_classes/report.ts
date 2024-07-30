import {Step} from "./step";

export class Report {
  constructor( entityId: number, label: string,   steps: Step[]) {
    this.entityId = entityId;
    this.label = label;
    this.steps = steps;
  }

  /**
   * The  id of the report.
   */
  entityId: number;

  /**
   * The name of the report.
   */
  label: string;

 
  /**
   * A list of steps 
   */
  steps: Step[];
}


