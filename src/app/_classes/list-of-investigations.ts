/**
 * Stores the data of a Investigation retrieved from the list of Investigations
 */
export class ListOfInvestigation {
  constructor(
    label: string,
    entityId: number,
    revisionCreationTime: string,
    revisionStatus: string,
    createdTime:string
  ) {
    this.label = label;
    this.entityId = entityId;
    this.revisionCreationTime = revisionCreationTime;
    this.revisionStatus = revisionStatus;
    this.createdTime = createdTime;
  }
  /**
   * The title of an investigation
   */
  label: string;

  /**
   * Reprents the id given by drupal for the investigation
   */
  entityId: number;

  /**
   * 
   */
  revisionCreationTime: string;

  /**
   * Determines the staus of an investigation (i.e, draft, archived, published)
   */
  revisionStatus: string;

  /**
   * Time when the investigation  created
   */
  createdTime:string;
}
