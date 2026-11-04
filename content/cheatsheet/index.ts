export type { Formula, Table, SheetSubject } from './types';
import type { SheetSubject } from './types';
import { probabilityStatistics } from './probability-statistics';
import { linearAlgebra } from './linear-algebra';
import { calculusOptimization } from './calculus-optimization';
import { programmingDsa } from './programming-dsa';
import { databaseWarehousing } from './database-warehousing';
import { machineLearning } from './machine-learning';
import { artificialIntelligence } from './artificial-intelligence';
import { generalAptitude } from './general-aptitude';

/** Subjects in syllabus order. */
export const SHEET: SheetSubject[] = [
  probabilityStatistics,
  linearAlgebra,
  calculusOptimization,
  programmingDsa,
  databaseWarehousing,
  machineLearning,
  artificialIntelligence,
  generalAptitude,
];
