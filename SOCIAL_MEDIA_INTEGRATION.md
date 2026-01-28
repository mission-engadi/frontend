# Social Media Integration Strategy## CloudCampaign as Primary Provider

## Decision Summary

✅ **Use CloudCampaign as primary provider** (white-label, full-featured)  
✅ **Keep Ayrshare/Buffer as fallback** (edge cases, pricing experiments)  
✅ **Build direct integrations incrementally** (Meta, LinkedIn, X)  
✅ **Provider abstraction in backend** (frontend agnostic)  

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND (Next.js)                       │
│                                                              │
│  • Campaign creation UI                                      │
│  • Post composer                                             │
│  • Schedule calendar                                         │
│  • Analytics dashboard                                       │
│                                                              │
│  Single API: POST /api/v1/social/posts                      │
└──────────────────────┬───────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              GATEWAY SERVICE (Port 8000)                     │
│              Routes to social-media-service                  │
└──────────────────────┬───────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│         SOCIAL-MEDIA-SERVICE (Port 8006)                     │
│                                                              │
│  ┌────────────────────────────────────────────────┐         │
│  │         PROVIDER ABSTRACTION LAYER             │         │
│  │                                                │         │
│  │  - Check org.preferred_provider                │         │
│  │  - Route to appropriate provider               │         │
│  │  - Handle errors & fallbacks                   │         │
│  │  - Normalize responses                         │         │
│  └────────────┬───────────────────────────────────┘         │
│               │                                              │
│       ┌───────┴───────┬──────────────┬─────────────┐        │
│       ▼               ▼              ▼             ▼        │
│  ┌─────────┐   ┌──────────┐   ┌─────────┐   ┌─────────┐   │
│  │  Cloud  │   │ Ayrshare │   │ Buffer  │   │ Direct  │   │
│  │Campaign │   │ Provider │   │Provider │   │  Meta   │   │
│  │Provider │   │          │   │         │   │Provider │   │
│  └────┬────┘   └────┬─────┘   └────┬────┘   └────┬────┘   │
└───────┼─────────────┼──────────────┼─────────────┼─────────┘
        │             │              │             │
        ▼             ▼              ▼             ▼
   CloudCampaign  Ayrshare API  Buffer API   Facebook API
   White-label                                Instagram API
```

---

## Provider Implementation Plan

### Phase 0: Provider Abstraction ✅ (Backend)

**Backend structure** (`social-media-service`):

```python
# social-media-service/app/providers/base.py
class SocialProvider:
    def __init__(self, config):
        self.config = config
    
    async def publish_post(self, post_data):
        raise NotImplementedError
    
    async def get_metrics(self, post_id):
        raise NotImplementedError
    
    async def connect_account(self, auth_data):
        raise NotImplementedError

# social-media-service/app/providers/cloudcampaign.py
class CloudCampaignProvider(SocialProvider):
    async def publish_post(self, post_data):
        # Call CloudCampaign API
        pass

# social-media-service/app/providers/ayrshare.py
class AyrshareProvider(SocialProvider):
    async def publish_post(self, post_data):
        # Call Ayrshare API
        pass
```

**Database schema** (organizations table):
```sql
ALTER TABLE organizations ADD COLUMN 
  preferred_social_provider VARCHAR(50) DEFAULT 'CLOUD_CAMPAIGN';

ALTER TABLE organizations ADD COLUMN 
  fallback_social_providers JSONB DEFAULT '["AYRSHARE", "BUFFER"]';
```

**Routing logic**:
```python
async def publish_post(org_id, post_data):
    org = get_organization(org_id)
    
    # Try primary provider
    provider = get_provider(org.preferred_social_provider)
    try:
        result = await provider.publish_post(post_data)
        return result
    except Exception as e:
        log_error(e)
        
        # Try fallback providers
        for fallback in org.fallback_social_providers:
            provider = get_provider(fallback)
            try:
                result = await provider.publish_post(post_data)
                return result
            except:
                continue
        
        raise Exception("All providers failed")
```

---

### Phase 1: CloudCampaign Integration (Week 2-3)

#### 1.1 CloudCampaign Setup

**Steps**:
1. Sign up for CloudCampaign white-label plan
2. Get API credentials (API key + secret)
3. Configure webhook URLs for callbacks
4. Set up white-label branding (Mission Engadi colors/logo)

**Environment variables** (backend):
```env
# social-media-service/.env
CLOUDCAMPAIGN_API_KEY=your-api-key
CLOUDCAMPAIGN_API_SECRET=your-secret
CLOUDCAMPAIGN_WEBHOOK_URL=https://api.mission-engadi.org/webhooks/cloudcampaign
CLOUDCAMPAIGN_BASE_URL=https://api.cloudcampaign.com/v1
```

#### 1.2 CloudCampaign Provider Implementation

**Key endpoints to implement**:

```python
# social-media-service/app/providers/cloudcampaign.py
import httpx

class CloudCampaignProvider(SocialProvider):
    BASE_URL = os.getenv("CLOUDCAMPAIGN_BASE_URL")
    
    async def connect_account(self, platform: str):
        """Generate OAuth URL for connecting social account"""
        response = await self.client.post(
            f"{self.BASE_URL}/accounts/connect",
            json={"platform": platform}
        )
        return response.json()["auth_url"]
    
    async def publish_post(self, post_data: dict):
        """Create and publish/schedule a post"""
        response = await self.client.post(
            f"{self.BASE_URL}/posts",
            json={
                "accounts": post_data["accounts"],  # ["facebook_123", "linkedin_456"]
                "content": post_data["content"],
                "media": post_data.get("media", []),
                "scheduled_at": post_data.get("scheduled_at"),
                "platforms": post_data["platforms"],
            }
        )
        return response.json()
    
    async def get_metrics(self, post_id: str):
        """Fetch analytics for a post"""
        response = await self.client.get(
            f"{self.BASE_URL}/posts/{post_id}/metrics"
        )
        metrics = response.json()
        
        # Normalize to our standard format
        return {
            "likes": metrics.get("likes", 0),
            "comments": metrics.get("comments", 0),
            "shares": metrics.get("shares", 0),
            "clicks": metrics.get("clicks", 0),
            "impressions": metrics.get("impressions", 0),
            "engagement_rate": metrics.get("engagement_rate", 0.0),
        }
    
    async def get_accounts(self):
        """List all connected accounts"""
        response = await self.client.get(f"{self.BASE_URL}/accounts")
        return response.json()["accounts"]
```

#### 1.3 Frontend Integration

**No changes needed!** Frontend just calls:

```typescript
// src/services/socialMediaService.ts
import { apiClient } from '@/src/config/api';

export const socialMediaService = {
  async createPost(data: CreatePostData) {
    const response = await apiClient.post('/api/v1/social/posts', data);
    return response.data;
  },
  
  async getAccounts() {
    const response = await apiClient.get('/api/v1/social/accounts');
    return response.data;
  },
  
  async getPostMetrics(postId: string) {
    const response = await apiClient.get(`/api/v1/social/metrics/${postId}`);
    return response.data;
  },
  
  async connectAccount(platform: 'facebook' | 'instagram' | 'linkedin' | 'twitter') {
    const response = await apiClient.post('/api/v1/social/accounts', { platform });
    // Returns OAuth URL, redirect user there
    window.location.href = response.data.auth_url;
  },
};
```

**UI Components**:

```typescript
// src/components/social/PostComposer.tsx
export function PostComposer() {
  const [content, setContent] = useState('');
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [scheduledAt, setScheduledAt] = useState<Date | null>(null);
  
  const handlePublish = async () => {
    await socialMediaService.createPost({
      content,
      platforms,
      scheduled_at: scheduledAt?.toISOString(),
    });
  };
  
  return (
    <Box>
      <TextField
        multiline
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's happening?"
      />
      
      <PlatformSelector
        selected={platforms}
        onChange={setPlatforms}
      />
      
      <DateTimePicker
        value={scheduledAt}
        onChange={setScheduledAt}
        label="Schedule for later"
      />
      
      <Button onClick={handlePublish}>
        {scheduledAt ? 'Schedule Post' : 'Publish Now'}
      </Button>
    </Box>
  );
}
```

#### 1.4 Embedded UI Option

CloudCampaign offers embedded white-label UI. You can choose:

**Option A: Full custom UI** (more work, more control)
- Build all UI components yourself
- Use CloudCampaign API for backend operations
- Pros: Full control, consistent with Mission Engadi design
- Cons: More development time

**Option B: Embedded CloudCampaign UI** (faster, less control)
- Embed CloudCampaign's white-label UI in an iframe
- Minimal custom UI needed
- Pros: Fast to market, feature-complete
- Cons: Less design control

**Recommendation**: Start with **Option A for posting**, **Option B for advanced features** (content calendar, bulk uploads).

Example embedded UI:
```typescript
// src/components/social/CloudCampaignEmbed.tsx
export function CloudCampaignEmbed() {
  const embedUrl = `https://app.cloudcampaign.com/embed?token=${authToken}&brand=mission-engadi`;
  
  return (
    <iframe
      src={embedUrl}
      width="100%"
      height="800px"
      frameBorder="0"
      title="Social Media Manager"
    />
  );
}
```

---

### Phase 2: Direct Integrations (Week 4-8)

Once CloudCampaign is stable, add direct integrations for cost savings and flexibility.

#### 2.1 Meta (Facebook + Instagram) Provider

**Setup**:
1. Create Meta App at developers.facebook.com
2. Request permissions:
   - `pages_read_engagement`
   - `pages_manage_posts`
   - `instagram_basic`
   - `instagram_content_publish`
3. Submit for App Review
4. Configure OAuth redirect

**Implementation**:
```python
# social-media-service/app/providers/meta.py
class MetaProvider(SocialProvider):
    async def publish_post(self, post_data):
        # Facebook Page post
        if "facebook" in post_data["platforms"]:
            await self._post_to_facebook(post_data)
        
        # Instagram Business post
        if "instagram" in post_data["platforms"]:
            await self._post_to_instagram(post_data)
    
    async def _post_to_facebook(self, post_data):
        url = f"https://graph.facebook.com/v18.0/{page_id}/feed"
        response = await self.client.post(url, json={
            "message": post_data["content"],
            "access_token": page_access_token,
        })
        return response.json()
    
    async def _post_to_instagram(self, post_data):
        # Instagram requires container creation first
        container_url = f"https://graph.facebook.com/v18.0/{instagram_account_id}/media"
        container = await self.client.post(container_url, json={
            "image_url": post_data["media"][0],
            "caption": post_data["content"],
            "access_token": access_token,
        })
        
        # Then publish container
        publish_url = f"https://graph.facebook.com/v18.0/{instagram_account_id}/media_publish"
        await self.client.post(publish_url, json={
            "creation_id": container.json()["id"],
            "access_token": access_token,
        })
```

#### 2.2 LinkedIn Provider

```python
# social-media-service/app/providers/linkedin.py
class LinkedInProvider(SocialProvider):
    async def publish_post(self, post_data):
        url = "https://api.linkedin.com/v2/ugcPosts"
        
        response = await self.client.post(url, json={
            "author": f"urn:li:organization:{org_id}",
            "lifecycleState": "PUBLISHED",
            "specificContent": {
                "com.linkedin.ugc.ShareContent": {
                    "shareCommentary": {
                        "text": post_data["content"]
                    },
                    "shareMediaCategory": "NONE"
                }
            },
            "visibility": {
                "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
            }
        }, headers={
            "Authorization": f"Bearer {access_token}",
            "X-Restli-Protocol-Version": "2.0.0"
        })
        
        return response.json()
```

#### 2.3 Configuration for Direct vs CloudCampaign

**Per-organization routing**:
```python
# Example: Mission Engadi main accounts use direct integration
# Regional offices use CloudCampaign

org_config = {
    "mission_engadi_hq": {
        "preferred_provider": "DIRECT_META",  # Facebook/IG direct
        "fallback": ["CLOUDCAMPAIGN", "AYRSHARE"]
    },
    "mission_engadi_brazil": {
        "preferred_provider": "CLOUDCAMPAIGN",  # Simpler for regional teams
        "fallback": ["AYRSHARE"]
    }
}
```

---

## Cost Comparison

### CloudCampaign (White-label)
- **Cost**: ~$99-299/month (depends on number of profiles/users)
- **Pros**: 
  - Full-featured out of the box
  - Content calendar, bulk upload, team collaboration
  - Agency workflows
  - White-label branding
- **Cons**: 
  - Monthly cost scales with usage
  - Vendor dependency

### Ayrshare (Backup)
- **Cost**: ~$49-199/month API plan
- **Pros**: Simple API, good for automation
- **Cons**: Less feature-rich than CloudCampaign

### Direct Integrations (DIY)
- **Cost**: Free (API calls free up to generous limits)
- **Dev cost**: 3-4 months initial, ongoing maintenance
- **Pros**: 
  - No vendor cost
  - Full control
  - Better for high-volume orgs
- **Cons**: 
  - Development time
  - API changes require updates
  - Compliance risk (ToS violations can ban app)

### Recommendation
**Year 1**: CloudCampaign + Ayrshare backup (~$150/month)
**Year 2**: Migrate high-volume accounts to direct integrations, keep CloudCampaign for long-tail platforms and advanced workflows

---

## Implementation Checklist

### Backend (social-media-service)
- [ ] Create provider abstraction interface
- [ ] Implement CloudCampaignProvider
- [ ] Implement AyrshareProvider (backup)
- [ ] Add provider routing logic
- [ ] Add org preference configuration
- [ ] Create unified REST API endpoints
- [ ] Handle OAuth callbacks
- [ ] Normalize metrics from different providers
- [ ] Add error handling & retries
- [ ] Set up webhook endpoints for status updates

### Frontend
- [ ] Create PostComposer component
- [ ] Create PlatformSelector component
- [ ] Create ScheduleCalendar component
- [ ] Create AccountConnector UI
- [ ] Create AnalyticsChart component
- [ ] Integrate socialMediaService
- [ ] Add campaign management pages
- [ ] Test OAuth flows
- [ ] Handle error states

### Infrastructure
- [ ] CloudCampaign account & API keys
- [ ] Ayrshare account & API keys (backup)
- [ ] Environment variables configured
- [ ] Webhook URLs publicly accessible
- [ ] SSL certificates for OAuth redirects

### Testing
- [ ] Test posting to Facebook
- [ ] Test posting to Instagram
- [ ] Test posting to LinkedIn
- [ ] Test posting to Twitter/X
- [ ] Test scheduling
- [ ] Test metrics fetching
- [ ] Test provider fallback
- [ ] Test bulk operations

---

## Next Steps

1. **Immediate** (This week):
   - Contact CloudCampaign sales for white-label demo
   - Get API documentation access
   - Set up developer account

2. **Week 1-2** (Backend):
   - Implement provider abstraction in social-media-service
   - Integrate CloudCampaign API
   - Add Ayrshare as fallback
   - Create unified endpoints

3. **Week 2-3** (Frontend):
   - Build social media campaign UI
   - Implement post composer
   - Add scheduling calendar
   - Create analytics dashboard

4. **Week 4+** (Enhancement):
   - Evaluate direct Meta integration
   - Plan LinkedIn direct integration
   - Assess X/Twitter value proposition

---

## Support & Resources

- **CloudCampaign**: Contact support for white-label documentation
- **Ayrshare API**: https://docs.ayrshare.com
- **Meta Graph API**: https://developers.facebook.com/docs/graph-api
- **LinkedIn API**: https://learn.microsoft.com/en-us/linkedin/marketing/
- **Twitter/X API**: https://developer.twitter.com/en/docs

---

**Status**: Planning Complete, Ready for Implementation  
**Decision**: CloudCampaign Primary + Incremental Direct Integrations  
**Timeline**: 8 weeks to fully functional social media management
