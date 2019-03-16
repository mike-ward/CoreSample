export interface IFilter {
  id: string;
  operator:
  '$includes'
  | '$excludes'
  | '$eq'
  | '$neq'
  | '$lt'
  | '$gt'
  | '$lte'
  | '$gte'
  | '$starts-with'
  | '$ends-with'
  | '$in-range';
  arg: any;
  exclude: boolean;
}