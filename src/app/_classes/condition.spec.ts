import { Condition } from './condition';

describe('Condition', () => {
  it('should create an instance', () => {
    expect(new Condition("1","123f","234f","1")).toBeTruthy();
  });
});
