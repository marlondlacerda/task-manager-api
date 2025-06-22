export interface ValidationErrorDetail {
  [field: string]: string;
}

export interface DefaultErrorResponse {
  success: false;
  error?: string;
  code: string;
  errors?: ValidationErrorDetail;
}
