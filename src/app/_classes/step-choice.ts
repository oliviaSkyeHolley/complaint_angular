/**
 * @whatItDoes Represents an step choice.
 *
 * @description
 *  An step choice forms a single choice in an step.
 */
export class StepChoice {
  constructor(label: string, description: string, choiceUuid: string, id: string, choiceVid: string, choiceCode: string, delta: string, hiddenOnInvestigation: string) {
    this.label = label;
    this.description = description;
    this.choiceUuid = choiceUuid;
    this.id = id;
    this.choiceVid = choiceVid;
    this.choiceCode = choiceCode;
    this.delta = delta;
    this.hiddenOnInvestigation = hiddenOnInvestigation;
  }

  /**
   * The label is used as the result value in the HL7 message.
   * It populates the step.value variable.
   */
  label: string;

  /**
   * The human readable description of the choice, this is displayed to users.
   */
  description: string;

  /**
   * The UUID assigned to this step choice by Drupal.
   */
  choiceUuid: string;

  /**
   * The below were added to facilitate teh form builder
   */

  /**
   * The choice ID
   */
  id: string;

  /**
   * In Drupal the revissions are kept, this is the Revision ID.
   */
  choiceVid: string;

  /**
   * The MOSAIQ Choice Code
   */
  choiceCode: string;

  /**
   *
   */
  delta: string;

  /**
   *
   */
  hiddenOnInvestigation: string;
}
