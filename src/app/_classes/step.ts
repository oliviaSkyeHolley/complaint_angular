import {StepChoice} from "./step-choice";

export class Step {




  constructor(code: string, id: string, stepVid: string, stepLabel: string, stepCode: string, displayType: string, delta: string, required: string, description: string, type: number, stepUuid: string, answer: string, choices: StepChoice[]) {
    this.code = code;
    this.id = id;
    this.stepVid = stepVid;
    this.stepLabel = stepLabel;
    this.stepCode = stepCode;
    this.displayType = displayType;
    this.delta = delta;
    this.required = required;
    this.description = description;
    this.type = type;
    this.stepUuid = stepUuid;
    this.answer = answer;
    this.choices = choices;
  }


  /**
   * The code is used to form the HL7 message, it is not displayed to users.
   */
  code: string;

  id: string;
  stepVid: string;
  stepLabel: string;
  stepCode: string;
  displayType: string;
  delta: string;
  required: string;

  /**
   * The description is shown to users as the step name.
   */
  description: string;

  /**
   * Type == 4 means this step has no choices, Type == 5 means that it does.
   */
  type: number;

  /**
   * The UUID assigned to this step by Drupal.
   */
  stepUuid: string;

  /**
   * The answer is populated by choice.label for step that have choices.
   * The answer is populated by text entry if the step does not have choices.
   */
  answer: string;

  /**
   * An array of step choices.
   * If an step has no choices, it will still be populated by one step choice. It's not used.
   */
  choices: StepChoice[];
}
