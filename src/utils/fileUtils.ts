import { generateMessageId } from './chatUtils';

export interface FileUploadResult {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

export async function handleFileUpload(file: File): Promise<FileUploadResult> {
  // In a production environment, this would upload to a server/cloud storage
  // For now, we'll use local URLs
  const url = URL.createObjectURL(file);
  
  return {
    id: generateMessageId(),
    name: file.name,
    url,
    type: file.type,
    size: file.size
  };
}

export function getFileTypeIcon(type: string): string {
  if (type.startsWith('audio/')) return 'audio';
  if (type.startsWith('image/')) return 'image';
  if (type.includes('pdf')) return 'file-text';
  return 'paperclip';
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}