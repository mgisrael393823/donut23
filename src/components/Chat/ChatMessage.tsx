import React from 'react';
import { Message } from '../../types/chat';
import { formatTimestamp } from '../../utils/chatUtils';
import { Bot, User, Paperclip, Play, Pause } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isAssistant = message.role === 'assistant';
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={`flex gap-3 ${isAssistant ? 'bg-gray-50' : ''} py-4`}>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
        isAssistant ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-600'
      }`}>
        {isAssistant ? <Bot size={18} /> : <User size={18} />}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-gray-900">
            {isAssistant ? 'AI Assistant' : 'You'}
          </span>
          <span className="text-xs text-gray-500">
            {formatTimestamp(message.timestamp)}
          </span>
        </div>
        <p className="text-sm text-gray-700 whitespace-pre-wrap">{message.content}</p>
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 space-y-2">
            {message.attachments.map((file) => (
              <div key={file.id} className="flex items-center gap-2">
                {file.type.startsWith('audio/') ? (
                  <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
                    <button
                      onClick={handlePlayPause}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                    <span className="text-sm text-gray-600">{file.name}</span>
                    <audio ref={audioRef} src={file.url} onEnded={() => setIsPlaying(false)} />
                  </div>
                ) : (
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg hover:bg-gray-100"
                  >
                    <Paperclip size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-600">{file.name}</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}