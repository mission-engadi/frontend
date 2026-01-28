/**
 * MessageList Component
 * Displays a scrollable list of chat messages
 */

'use client';

import React, { useEffect, useRef } from 'react';
import { Box, Typography, Alert } from '@mui/material';
import { Message } from '@/src/types/ai-assistant';
import { ChatMessage } from './ChatMessage';

interface MessageListProps {
  messages: Message[];
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
}

export function MessageList({
  messages,
  loading = false,
  error = null,
  emptyMessage = 'No messages yet. Start a conversation!',
}: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: 'auto',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0, // Important for flex scrolling
      }}
    >
      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Empty State */}
      {messages.length === 0 && !loading && !error && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            textAlign: 'center',
            color: 'text.secondary',
          }}
        >
          <Typography variant="body2">{emptyMessage}</Typography>
        </Box>
      )}

      {/* Messages */}
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}

      {/* Auto-scroll anchor */}
      <div ref={messagesEndRef} />
    </Box>
  );
}
