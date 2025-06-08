import type { BaseDTO } from './base';

export interface MultipleChoiceOptionDTO {
  text: string;
  isCorrect: boolean;
  order: number;
}

export interface MultipleChoiceOptionResponseDTO extends BaseDTO {
  text: string;
  isCorrect: boolean;
  order: number;
  assignmentId: number;
}
