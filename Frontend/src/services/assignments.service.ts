import { api } from '../config/api';
import type { AssignmentResponseDTO, AssignmentCreateDTO } from '../DTOs';

export interface IAssignmentsApi {
  getAssignments(): Promise<AssignmentResponseDTO[]>;
  createAssignment(assignment: AssignmentCreateDTO): Promise<AssignmentResponseDTO>;
  deleteAssignment(id: number): Promise<void>;
}

export class AssignmentsApi implements IAssignmentsApi {
  async getAssignments(): Promise<AssignmentResponseDTO[]> {
    try {
      const response = await api.get<AssignmentResponseDTO[]>('/assignments');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch assignments');
    }
  }

  async createAssignment(assignment: AssignmentCreateDTO): Promise<AssignmentResponseDTO> {
    try {
      const response = await api.post<AssignmentResponseDTO>('/assignments', assignment);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create assignment');
    }
  }

  async deleteAssignment(id: number): Promise<void> {
    try {
      await api.delete(`/assignments/${id}`);
    } catch (error) {
      throw new Error('Failed to delete assignment');
    }
  }
}
