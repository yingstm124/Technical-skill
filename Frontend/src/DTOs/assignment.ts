import type { BaseDTO } from './base';
import type { MultipleChoiceOptionDTO, MultipleChoiceOptionResponseDTO } from './multipleChoiceOption';

export interface AssignmentCreateDTO {
  title: string;
  description?: string;
  points: number;
  multipleChoiceOptions: MultipleChoiceOptionDTO[];
}

export interface AssignmentUpdateDTO {
  title: string;
  description?: string;
  points: number;
  multipleChoiceOptions: MultipleChoiceOptionDTO[];
}

export interface AssignmentResponseDTO extends BaseDTO {
  title: string;
  description?: string;
  points: number;
  status: 'Draft' | 'Published' | 'Archived';
  multipleChoiceOptions: MultipleChoiceOptionResponseDTO[];
}
