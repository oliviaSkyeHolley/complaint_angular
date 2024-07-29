import {Step} from "./step";

export class Investigation {
  constructor( entityId: number, label: string,   steps: Step[]) {
    this.entityId = entityId;
    this.label = label;
    this.steps = steps;
  }

  /**
   * The  id of the investigation.
   */
  entityId: number;

  /**
   * The name of the investigation.
   */
  label: string;

 
  /**
   * A list of steps 
   */
  steps: Step[];
}


