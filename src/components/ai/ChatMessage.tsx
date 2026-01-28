/**
 * ChatMessage Component
 * Displays a single message in the chat interface
 */

'use client';

import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Chip,
  CircularProgress,
} from '@mui/material';
import {
  Person as PersonIcon,
  SmartToy as AIIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { Message } from '@/src/types/ai-assistant';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isUser ? 'row-reverse' : 'row',
        gap: 1.5,
        mb: 2,
        alignItems: 'flex-start',
      }}
    >
      {/* Avatar */}
      <Avatar
        sx={{
          bgcolor: isUser ? 'primary.main' : isSystem ? 'info.main' : 'secondary.main',
          width: 36,
          height: 36,
        }}
      >
        {isUser ? (
          <PersonIcon fontSize="small" />
        ) : isSystem ? (
          <InfoIcon fontSize="small" />
        ) : (
          <AIIcon fontSize="small" />
        )}
      </Avatar>

      {/* Message Content */}
      <Paper
        elevation={1}
        sx={{
          p: 2,
          maxWidth: '75%',
          bgcolor: isUser ? 'primary.light' : isSystem ? 'info.light' : 'background.paper',
          color: isUser ? 'primary.contrastText' : 'text.primary',
          borderRadius: 2,
          position: 'relative',
        }}
      >
        {/* Role Label */}
        {!isUser && (
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              fontWeight: 600,
              mb: 0.5,
              color: isSystem ? 'info.dark' : 'secondary.main',
            }}
          >
            {isSystem ? 'System' : 'AI Assistant'}
          </Typography>
        )}

        {/* Message Text */}
        {message.streaming ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body1" component="div">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </Typography>
            <CircularProgress size={16} />
          </Box>
        ) : (
          <Typography variant="body1" component="div" sx={{ '& p': { m: 0 } }}>
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </Typography>
        )}

        {/* Timestamp */}
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            mt: 1,
            opacity: 0.7,
            fontSize: '0.7rem',
          }}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Typography>
      </Paper>
    </Box>
  );
}
