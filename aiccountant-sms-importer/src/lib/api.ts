// Reusable API client with automatic Bearer token attachment

const API_BASE_URL = 'https://api.aiccountant.id';

interface ApiError {
  message: string;
  status?: number;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Get token from localStorage
  private getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('access_token');
  }

  // Core fetch wrapper with automatic token attachment
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getToken();
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const mutableHeaders = headers as Record<string, string>
    
    // Attach Bearer token if available
    if (token) {
      mutableHeaders['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    // Handle 401 Unauthorized - trigger logout
    if (response.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      throw { message: 'Unauthorized. Please login again.', status: 401 } as ApiError;
    }

    const data = await response.json();

    if (!response.ok) {
      throw { 
        message: data.message || 'Something went wrong', 
        status: response.status 
      } as ApiError;
    }

    return data;
  }

  // Auth endpoints
  async register(email: string, password: string, name: string) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  }

  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  // Transaction endpoint (for Step 2)
  async getTransactions(params?: {
    limit?: number;
    page?: number;
    startDate?: string;
    endDate?: string;
    isReviewed?: boolean;
  }) {
    const queryParams = new URLSearchParams();
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.startDate) queryParams.append('startDate', params.startDate);
    if (params?.endDate) queryParams.append('endDate', params.endDate);
    if (params?.isReviewed !== undefined) {
      queryParams.append('isReviewed', params.isReviewed.toString());
    }

    const queryString = queryParams.toString();
    const endpoint = `/transactions${queryString ? `?${queryString}` : ''}`;
    
    return this.request(endpoint, { method: 'GET' });
  }

  // SMS batch import (for Step 2)
  async sendSmsBatch(messages: Array<{
    raw_message: string;
    sender: string;
    timestamp: number;
  }>) {
    return this.request('/sms/batch', {
      method: 'POST',
      body: JSON.stringify({ messages }),
    });
  }
}

export const api = new ApiClient(API_BASE_URL);