import { VersionContentModel } from './version-content.model';

export interface StepResponseModel {
  id: string;
  stepNumber: string;
  versionContent: VersionContentModel[];
}
