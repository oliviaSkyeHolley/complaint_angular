export class Condition{

constructor(id:string, stepUuid: string, choiceUuid: string, priority: string){
    this.id = id;
    this.stepUuid = stepUuid;
    this.choiceUuid = choiceUuid;
    this.prioritty = priority;
}
/**
 * represents the id a condition
 */
id: string;

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