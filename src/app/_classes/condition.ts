export class Condition{

constructor(conditionId:string, stepUuid: string, choiceUuid: string, priority: string){
    this.conditionId = conditionId;
    this.stepUuid = stepUuid;
    this.choiceUuid = choiceUuid;
    this.prioritty = priority;
}
/**
 * represents the id a condition
 */
conditionId: string;

/**
 * determines the step using it uuid
 */
stepUuid: string;

/**
 * represents a choice using its uuid
 */
choiceUuid: string;

/**
 * decides the prority of the conditions(1,2,3...)
 */
prioritty: string;

}