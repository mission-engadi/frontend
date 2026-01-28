/**
 * ChatInput Component
 * Input field for sending messages to AI assistant
 */

'use client';

import React, { useState, KeyboardEvent } from 'react';
import {
  Box,
  TextField,
  IconButton,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import {
  Send as SendIcon,
  Mic as MicIcon,
  AttachFile as AttachIcon,
} from '@mui/icons-material';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  multiline?: boolean;
  showAttach?: boolean;
  showVoice?: boolean;
}

export function ChatInput({
  onSend,
  disabled = false,
  placeholder = 'Type your message...',
  multiline = true,
  showAttach = false,
  showVoice = false,
}: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        alignItems: 'flex-end',
        p: 2,
        borderTop: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      {/* Attach Button (optional) */}
      {showAttach && (
        <Tooltip title="Attach file">
          <IconButton
            size="small"
            disabled={disabled}
            sx={{ mb: 0.5 }}
          >
            <AttachIcon />
          </IconButton>
        </Tooltip>
      )}

      {/* Text Input */}
      <TextField
        fullWidth
        multiline={multiline}
        maxRows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        disabled={disabled}
        variant="outlined"
        size="small"
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 3,
          },
        }}
      />

      {/* Voice Button (optional) */}
      {showVoice && (
        <Tooltip title="Voice input">
          <IconButton
            size="small"
            disabled={disabled}
            sx={{ mb: 0.5 }}
          >
            <MicIcon />
          </IconButton>
        </Tooltip>
      )}

      {/* Send Button */}
      <Tooltip title="Send message">
        <span>
          <IconButton
            color="primary"
            onClick={handleSend}
            disabled={disabled || !message.trim()}
            sx={{ mb: 0.5 }}
          >
            {disabled ? <CircularProgress size={24} /> : <SendIcon />}
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  );
}
