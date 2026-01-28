import { AxiosError } from 'axios';

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: any;
}

export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const data = error.response?.data;

    // Handle different error types
    if (status === 401) {
      return {
        message: 'Unauthorized. Please log in again.',
        code: 'UNAUTHORIZED',
        status,
      };
    }

    if (status === 403) {
      return {
        message: 'You do not have permission to perform this action.',
        code: 'FORBIDDEN',
        status,
      };
    }

    if (status === 404) {
      return {
        message: 'The requested resource was not found.',
        code: 'NOT_FOUND',
        status,
      };
    }

    if (status === 422) {
      return {
        message: data?.message || 'Validation error. Please check your input.',
        code: 'VALIDATION_ERROR',
        status,
        details: data?.detail,
      };
    }

    if (status === 500) {
      return {
        message: 'An internal server error occurred. Please try again later.',
        code: 'INTERNAL_ERROR',
        status,
      };
    }

    // Generic error
    return {
      message: data?.message || error.message || 'An error occurred',
      code: data?.code || 'API_ERROR',
      status,
      details: data?.detail,
    };
  }

  // Non-Axios error
  if (error instanceof Error) {
    return {
      message: error.message,
      code: 'ERROR',
    };
  }

  return {
    message: 'An unknown error occurred',
    code: 'UNKNOWN_ERROR',
  };
};

export const downloadFile = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
