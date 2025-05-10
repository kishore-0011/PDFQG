export type DocumentSourceType = 'pdf' | 'text_input';
export type DocumentStatus = 'pending' | 'processing' | 'failed'| 'completed';

export interface DocumentData {
    id: string;
  title: string;
  source_type: DocumentSourceType;
  file_path?: string;
  file_size?: number;
  content_text?: string;
  status: DocumentStatus;
  user_id: string;
  created_at: Date;
  updated_at: Date;

}

export interface CreateDocumentDto {
  title: string;
  source_type: DocumentSourceType;
  user_id: string;
  file_path?: string;
  file_size?: number;
  content_text?: string;
}

export interface CreateTextDocumentDto {
  title: string;
  content_text: string;
  user_id: string;
}

export interface DocumentListItem {
  id: string;
  title: string;
  status: DocumentStatus;
  created_at: Date;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface DocumentListParams {
  page?: number;
  limit?: number;
  status?: DocumentStatus;
  user_id: string;
}