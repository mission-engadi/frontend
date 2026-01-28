/**
 * AIAssistantPanel Component
 * Main reusable AI chat interface for all contexts
 */

'use client';

import React, { useState, useCallback, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Collapse,
  Divider,
  Alert,
  Tooltip,
} from '@mui/material';
import {
  SmartToy as AIIcon,
  ExpandMore as ExpandIcon,
  ExpandLess as CollapseIcon,
  Close as CloseIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { QuickActions } from './QuickActions';
import { aiAssistantService } from '@/lib/services/ai-assistant.service';
import { AIContext, Message, AIAction } from '@/src/types/ai-assistant';

interface AIAssistantPanelProps {
  context: AIContext;
  title?: string;
  initialPrompt?: string;
  onAction?: (action: AIAction) => void;
  metadata?: Record<string, any>;
  defaultExpanded?: boolean;
  showQuickActions?: boolean;
  welcomeMessage?: string;
}

export function AIAssistantPanel({
  context,
  title = 'AI Assistant',
  initialPrompt,
  onAction,
  metadata = {},
  defaultExpanded = true,
  showQuickActions = true,
  welcomeMessage,
}: AIAssistantPanelProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string>();

  // Initialize with welcome message
  useEffect(() => {
    if (welcomeMessage && messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: welcomeMessage,
          timestamp: new Date(),
        },
      ]);
    }
  }, [welcomeMessage, messages.length]);

  // Send initial prompt if provided
  useEffect(() => {
    if (initialPrompt && messages.length === 0) {
      handleSendMessage(initialPrompt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt]);

  const handleSendMessage = useCallback(
    async (message: string) => {
      if (!message.trim()) return;

      // Add user message
      const userMessage: Message = {
        id: `user_${Date.now()}`,
        role: 'user',
        content: message,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setLoading(true);
      setError(null);

      try {
        // Call AI service
        const response = await aiAssistantService.chat({
          message,
          context,
          conversationId,
          metadata,
        });

        // Update conversation ID
        if (response.conversationId) {
          setConversationId(response.conversationId);
        }

        // Add AI response
        const aiMessage: Message = {
          id: `ai_${Date.now()}`,
          role: 'assistant',
          content: response.message,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMessage]);

        // Handle suggested actions
        if (response.suggestedActions && response.suggestedActions.length > 0 && onAction) {
          response.suggestedActions.forEach((action) => {
            onAction(action);
          });
        }
      } catch (err: any) {
        setError(err.message || 'Failed to get AI response');
        console.error('AI Assistant error:', err);
      } finally {
        setLoading(false);
      }
    },
    [context, conversationId, metadata, onAction]
  );

  const handleQuickAction = useCallback(
    (prompt: string) => {
      handleSendMessage(prompt);
    },
    [handleSendMessage]
  );

  const handleReset = useCallback(() => {
    setMessages([]);
    setConversationId(undefined);
    setError(null);

    // Re-add welcome message if it exists
    if (welcomeMessage) {
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: welcomeMessage,
          timestamp: new Date(),
        },
      ]);
    }
  }, [welcomeMessage]);

  return (
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: expanded ? 600 : 'auto',
        maxHeight: '80vh',
        overflow: 'hidden',
        borderRadius: 2,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          cursor: 'pointer',
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AIIcon />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {expanded && (
            <>
              <Tooltip title="Reset conversation">
                <IconButton
                  size="small"
                  sx={{ color: 'inherit' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReset();
                  }}
                >
                  <RefreshIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </>
          )}

          <IconButton size="small" sx={{ color: 'inherit' }}>
            {expanded ? <CollapseIcon /> : <ExpandIcon />}
          </IconButton>
        </Box>
      </Box>

      {/* Collapsible Content */}
      <Collapse in={expanded} timeout="auto">
        {/* Messages Area */}
        <MessageList
          messages={messages}
          loading={loading}
          error={error}
          emptyMessage={`Hi! I'm your AI assistant for ${context}. How can I help you today?`}
        />

        <Divider />

        {/* Quick Actions */}
        {showQuickActions && (
          <>
            <QuickActions
              context={context}
              onAction={handleQuickAction}
              disabled={loading}
            />
            <Divider />
          </>
        )}

        {/* Input Area */}
        <ChatInput
          onSend={handleSendMessage}
          disabled={loading}
          placeholder={`Ask me anything about ${context}...`}
        />
      </Collapse>
    </Paper>
  );
}
