import React from 'react';
import { Task } from '../../types/task';
import { Calendar, Clock, Tag, Paperclip, Image, FileText } from 'lucide-react';
import { getFileTypeIcon, formatFileSize } from '../../utils/fileUtils';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('taskId', task.id);
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-lime text-eerie-black';
      case 'medium':
        return 'bg-cream text-eerie-black';
      case 'low':
        return 'bg-timberwolf text-onyx';
    }
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-all cursor-move border-2 border-transparent hover:border-electric"
    >
      <h4 className="font-bold text-eerie-black mb-2">{task.title}</h4>
      <p className="text-onyx text-sm mb-4">{task.description}</p>
      
      <div className="flex items-center gap-2 mb-4">
        <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </span>
        {task.tags.map((tag) => (
          <span key={tag} className="flex items-center text-xs text-onyx">
            <Tag size={12} className="mr-1" />
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-timberwolf text-sm">
        <div className="flex items-center">
          <Calendar size={14} className="mr-1" />
          {new Date(task.dueDate).toLocaleDateString()}
        </div>
        {task.timeEstimate && (
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            {task.timeEstimate}h
          </div>
        )}
      </div>
      {task.attachments.length > 0 && (
        <div className="mt-2 space-y-1">
          {task.attachments.map((file) => (
            <a
              key={file.id}
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-500 text-sm hover:text-indigo-600 transition-colors"
            >
              {getFileTypeIcon(file.type) === 'image' && <Image size={14} />}
              {getFileTypeIcon(file.type) === 'file-text' && <FileText size={14} />}
              {getFileTypeIcon(file.type) === 'paperclip' && <Paperclip size={14} />}
              <span className="truncate">{file.name}</span>
              <span className="text-xs">({formatFileSize(file.size)})</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}