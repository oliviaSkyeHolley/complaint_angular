/**
 * Stores the data of a Investigation retrieved from the list of Investigations
 * Maintains the format defined from Drupal
 */
export class ListOfInvestigation {
  constructor(
    label: string,
    entityId: number,
    revisionId: number,
    revisionCreationTime: string,
    revisionStatus: string
  ) {
    this.label = label;
    this.entityId = entityId;
    this.revisionId = revisionId;
    this.revisionCreationTime = revisionCreationTime;
    this.revisionStatus = revisionStatus;
  }
  /**
   * Tabview's label
   */
  label: string;
  /**
   * The entity id of a tab view
   * Uniquely identifies the tabview drupal
   */
  entityId: number;
  revisionId: number;
  revisionCreationTime: string;
  revisionStatus: string;
}
