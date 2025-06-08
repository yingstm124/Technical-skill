// API Response type
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
