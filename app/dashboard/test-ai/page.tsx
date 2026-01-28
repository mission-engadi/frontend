'use client';

import React from 'react';
import { AIAssistantPanel } from '@/src/components/ai';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import { AIAction } from '@/src/types/ai-assistant';

export default function TestAIPage() {
  const handleAction = (action: AIAction) => {
    console.log('AI suggested action:', action);
    alert(`AI Action: ${action.label}\nType: ${action.type}\n\nData: ${JSON.stringify(action.data, null, 2)}`);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4, bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          🤖 AI Chat Infrastructure Test
        </Typography>
        <Typography variant="h6">
          Phase 1: Core AI Assistant - Try chatting with different AI assistants below!
        </Typography>
      </Paper>

      <Grid container spacing={4}>
        {/* General Chat */}
        <Grid item xs={12} lg={6}>
          <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Test 1: General AI Assistant
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Try: "What can you help me with?" or "Tell me about the platform"
            </Typography>
            <AIAssistantPanel
              context="general"
              title="General AI Assistant"
              welcomeMessage="Hi! I'm your AI assistant for MinistryOS. I can help you with projects, content creation, campaigns, donor management, and analytics. What would you like to do today?"
              onAction={handleAction}
              defaultExpanded={true}
            />
          </Paper>
        </Grid>

        {/* Project Assistant */}
        <Grid item xs={12} lg={6}>
          <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Test 2: Project Assistant
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Try: "I want to create a water project in Kenya for 500 people"
            </Typography>
            <AIAssistantPanel
              context="project"
              title="Project AI Assistant"
              welcomeMessage="Tell me about the project you want to create, and I'll help you plan it! I can help with budgets, timelines, crisis intelligence, and more."
              onAction={handleAction}
              defaultExpanded={false}
            />
          </Paper>
        </Grid>

        {/* Content Assistant */}
        <Grid item xs={12} lg={6}>
          <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Test 3: Content Assistant
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Try: "Write an article about clean water impact" or "Help me with SEO"
            </Typography>
            <AIAssistantPanel
              context="content"
              title="Content AI Assistant"
              welcomeMessage="I can help you write articles, social posts, emails, and more. I can also translate to 4 languages and optimize for SEO. What do you need?"
              onAction={handleAction}
              defaultExpanded={false}
            />
          </Paper>
        </Grid>

        {/* Campaign Assistant */}
        <Grid item xs={12} lg={6}>
          <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Test 4: Campaign Assistant
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Try: "Create posts for Facebook and Twitter about our Kenya project"
            </Typography>
            <AIAssistantPanel
              context="campaign"
              title="Campaign AI Assistant"
              welcomeMessage="I can create multi-platform social media campaigns, suggest optimal posting times, and help with engagement. What campaign do you want to create?"
              onAction={handleAction}
              defaultExpanded={false}
            />
          </Paper>
        </Grid>

        {/* CRM Assistant */}
        <Grid item xs={12} lg={6}>
          <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Test 5: CRM / Donor Assistant
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Try: "Help me write a thank you message for donors" or "How do I segment my donors?"
            </Typography>
            <AIAssistantPanel
              context="crm"
              title="CRM AI Assistant"
              welcomeMessage="I can help you manage donor relationships, write personalized messages, segment your donors, and improve retention. How can I help?"
              onAction={handleAction}
              defaultExpanded={false}
            />
          </Paper>
        </Grid>

        {/* Analytics Assistant */}
        <Grid item xs={12} lg={6}>
          <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Test 6: Analytics Assistant
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Try: "What insights can you give me?" or "Help me forecast donations"
            </Typography>
            <AIAssistantPanel
              context="analytics"
              title="Analytics AI Assistant"
              welcomeMessage="I can analyze your data, identify trends, create forecasts, and generate reports. What would you like to know about your data?"
              onAction={handleAction}
              defaultExpanded={false}
            />
          </Paper>
        </Grid>
      </Grid>

      {/* Instructions */}
      <Paper elevation={2} sx={{ p: 3, mt: 4, bgcolor: 'info.light' }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          📝 Testing Instructions
        </Typography>
        <Typography variant="body2" component="div">
          <ol style={{ marginLeft: '20px', marginTop: '10px' }}>
            <li style={{ marginBottom: '8px' }}>Click on any panel header to expand/collapse it</li>
            <li style={{ marginBottom: '8px' }}>Try the "Quick Actions" buttons for preset prompts</li>
            <li style={{ marginBottom: '8px' }}>Type your own messages and press Enter to chat</li>
            <li style={{ marginBottom: '8px' }}>Watch for AI responses (should appear in 2-3 seconds)</li>
            <li style={{ marginBottom: '8px' }}>Click the refresh icon to reset a conversation</li>
            <li style={{ marginBottom: '8px' }}>Open browser console (F12) to see AI action callbacks</li>
            <li style={{ marginBottom: '8px' }}>Have a multi-turn conversation to test context memory</li>
          </ol>
        </Typography>
      </Paper>

      {/* What to Expect */}
      <Paper elevation={2} sx={{ p: 3, mt: 2, bgcolor: 'success.light' }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          ✅ What Should Work
        </Typography>
        <Typography variant="body2" component="div">
          <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
            <li style={{ marginBottom: '8px' }}>
              <strong>Natural language chat</strong> - AI understands your questions in plain English
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Context awareness</strong> - Each assistant specializes in its domain (project, content, etc.)
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Conversation memory</strong> - AI remembers what you said earlier in the conversation
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Quick actions</strong> - Predefined prompts for common tasks
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Markdown formatting</strong> - AI responses are nicely formatted
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Action suggestions</strong> - AI may suggest follow-up actions (check console)
            </li>
          </ul>
        </Typography>
      </Paper>
    </Container>
  );
}
