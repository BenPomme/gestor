import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import type { ApiResponse, ApiError } from '@gestorapp/shared';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

class ApiClient {
  private client: AxiosInstance;
  private accessToken: string | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.client.interceptors.request.use(this.handleRequest.bind(this));
    this.client.interceptors.response.use(
      (response) => response,
      this.handleError.bind(this)
    );
  }

  private handleRequest(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    if (this.accessToken) {
      config.headers.Authorization = `Bearer ${this.accessToken}`;
    }
    return config;
  }

  private async handleError(error: AxiosError<ApiResponse<unknown>>): Promise<never> {
    if (error.response?.status === 401) {
      // Token expired, try to refresh
      // TODO: Implement refresh token logic
      this.clearToken();
    }
    throw error;
  }

  setToken(token: string): void {
    this.accessToken = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', token);
    }
  }

  clearToken(): void {
    this.accessToken = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
    }
  }

  loadToken(): void {
    if (typeof window !== 'undefined') {
      this.accessToken = localStorage.getItem('accessToken');
    }
  }

  async get<T>(url: string, params?: Record<string, unknown>): Promise<ApiResponse<T>> {
    const response = await this.client.get<ApiResponse<T>>(url, { params });
    return response.data;
  }

  async post<T>(url: string, data?: unknown): Promise<ApiResponse<T>> {
    const response = await this.client.post<ApiResponse<T>>(url, data);
    return response.data;
  }

  async patch<T>(url: string, data?: unknown): Promise<ApiResponse<T>> {
    const response = await this.client.patch<ApiResponse<T>>(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    const response = await this.client.delete<ApiResponse<T>>(url);
    return response.data;
  }

  async upload<T>(url: string, file: File, data?: Record<string, unknown>): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
    }
    const response = await this.client.post<ApiResponse<T>>(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }
}

export const api = new ApiClient();
