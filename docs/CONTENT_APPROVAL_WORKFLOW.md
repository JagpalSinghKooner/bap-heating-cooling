# CONTENT APPROVAL WORKFLOW

**Document Type:** Content Production Process Framework
**Status:** Locked
**Last Updated:** 2026-01-09
**Owner:** Content Systems Architecture + SEO Lead

---

## PURPOSE

This document establishes the **mandatory workflow** for all content creation, from initial draft through publication.

**No content may be published without completing all workflow stages.**

This workflow ensures:
- Quality control at every stage
- Accountability and traceability
- Compliance with governance rules
- Auditability of all content decisions

---

## 1. CONTENT LIFECYCLE STATES

All content MUST progress through these states in order:

### State 1: DRAFT

**Definition:** Content is being actively created but is not ready for review.

**Characteristics:**
- Content file exists in approved collection
- Frontmatter includes `status: "draft"`
- Content may be incomplete
- Not visible on production site
- Not indexed by search engines

**Who Can Create:**
- Content creators (human)
- AI-assisted content generation (with human oversight)

**Exit Criteria:**
- Content is complete (meets minimum word count)
- All required frontmatter fields populated
- Creator believes content is ready for internal review

**Next State:** Internal Review

---

### State 2: INTERNAL REVIEW

**Definition:** Content is complete and undergoing first-pass quality review by content team.

**Characteristics:**
- Frontmatter includes `status: "internal_review"`
- Content is complete and formatted
- Assigned to reviewer
- Not visible on production site
- Review comments tracked

**Who Reviews:**
- Content team lead
- Peer content creators (for cross-review)

**Review Checklist:**
- [ ] Meets minimum word count for page type
- [ ] Follows approved content structure
- [ ] Adheres to brand voice and tone standards
- [ ] Uses Canadian English spelling
- [ ] No prohibited words/phrases
- [ ] All claims are verifiable
- [ ] Grammar and spelling correct
- [ ] Readability within target range (grade 8-10)
- [ ] Images have alt text (if applicable)
- [ ] Internal links present and valid

**Possible Outcomes:**
1. **APPROVED** → Advance to SEO Review
2. **REVISION REQUIRED** → Return to Draft with comments
3. **REJECTED** → Archive, do not proceed

**Exit Criteria:**
- All internal review checklist items pass
- Reviewer approves advancement

**Next State:** SEO Review OR Draft (if revision required)

---

### State 3: SEO REVIEW

**Definition:** Content has passed internal review and is undergoing SEO and technical compliance review.

**Characteristics:**
- Frontmatter includes `status: "seo_review"`
- Assigned to SEO lead or technical reviewer
- SEO tools applied (uniqueness check, keyword analysis, etc.)
- Not visible on production site

**Who Reviews:**
- SEO lead
- Technical SEO specialist
- Content systems architect (for high-value pages)

**Review Checklist:**

**Uniqueness Compliance:**
- [ ] Uniqueness score calculated and meets threshold
- [ ] No city-name swap patterns detected
- [ ] No paragraph spinning detected
- [ ] FAQ/review scoping validated
- [ ] Textual uniqueness verified (Copyscape/Siteliner)

**SEO Technical:**
- [ ] Title tag unique and optimized (<60 chars)
- [ ] Meta description unique and compelling (120-160 chars)
- [ ] Target keyword identified and naturally integrated
- [ ] Heading hierarchy correct (H1 → H2 → H3)
- [ ] Internal links strategically placed (minimum required)
- [ ] Schema markup supported by content
- [ ] URL slug optimized and follows convention

**FAQ/Review Scoping:**
- [ ] FAQ scope matches page type (service-city pages have scoped FAQs)
- [ ] Review scope matches page type
- [ ] Minimum FAQ/review count met (if applicable)

**CTA Alignment:**
- [ ] CTAs follow conversion hierarchy (Step 7 governance)
- [ ] Emergency CTAs used appropriately (not overused)
- [ ] CTA copy is action-oriented and specific

**Emergency Usage Compliance:**
- [ ] Emergency keywords used appropriately (within limits)
- [ ] Emergency positioning follows governance (not emergency-first unless emergency page)
- [ ] Emergency links present where required

**Schema Safety:**
- [ ] Content supports existing schema implementation
- [ ] Service type, location, offer details accurate
- [ ] No schema-breaking content introduced

**Possible Outcomes:**
1. **APPROVED** → Advance to Approved/Ready to Publish
2. **MINOR REVISIONS** → SEO lead makes quick fixes, then approves
3. **MAJOR REVISIONS** → Return to Draft with detailed feedback
4. **REJECTED** → Archive, do not proceed

**Exit Criteria:**
- All SEO review checklist items pass
- SEO lead approves advancement

**Next State:** Approved OR Draft (if major revision required)

---

### State 4: APPROVED

**Definition:** Content has passed all reviews and is ready for publication.

**Characteristics:**
- Frontmatter includes `status: "approved"`
- All review checklists complete
- Approval signatures/timestamps logged
- Scheduled for publication or ready for immediate publish
- Not yet visible on production site

**Who Approves:**
- SEO lead (final sign-off)
- Content systems architect (for high-value pages)

**Publication Triggers:**
1. **Immediate Publication:** Content is published to production immediately
2. **Scheduled Publication:** Content is queued for specific publish date/time
3. **Hold for Batch:** Content is held with other approved content for batch publish

**Exit Criteria:**
- Publication action initiated

**Next State:** Published

---

### State 5: PUBLISHED

**Definition:** Content is live on production site and visible to users and search engines.

**Characteristics:**
- Frontmatter includes `status: "published"`
- `publishDate` field populated with publish timestamp
- Visible on production site
- Indexed by search engines (after crawl)
- Subject to ongoing monitoring

**Post-Publication Actions:**
- [ ] Verify page renders correctly on production
- [ ] Verify internal links work
- [ ] Submit URL to Google Search Console (high-value pages)
- [ ] Monitor for indexing (48-72 hours)
- [ ] Track in analytics (set up goals if needed)

**Ongoing Monitoring:**
- Monthly traffic review
- Quarterly uniqueness audit
- Annual content refresh review

**Possible State Changes:**
1. **ARCHIVED:** Content is outdated or no longer relevant (unpublished, retained for records)
2. **REVISION IN PROGRESS:** Content needs updates (returns to Draft state)

**Exit Criteria:**
- Content is archived or updated

**Next State:** Archived OR Draft (for revision)

---

### State 6: ARCHIVED (Optional)

**Definition:** Content has been unpublished and is retained for historical/audit purposes only.

**Characteristics:**
- Frontmatter includes `status: "archived"`
- Not visible on production site
- Not indexed by search engines
- 301 redirect implemented (if URL previously published)
- Retained in version control

**Reasons for Archiving:**
- Service no longer offered
- City no longer served
- Content replaced by updated version
- Content violated governance rules post-publication
- Seasonal content (e.g., rebate programs that expired)

**Archive Process:**
1. Change status to "archived"
2. Implement 301 redirect to relevant active page
3. Remove from site navigation and sitemaps
4. Document reason for archiving
5. Retain file in archive directory

---

## 2. WORKFLOW DIAGRAM

```
┌─────────┐
│  DRAFT  │ ← Content Creation (Human + AI)
└────┬────┘
     │
     ▼
┌──────────────────┐
│ INTERNAL REVIEW  │ ← Content Team Review
└────┬────┬────────┘
     │    │
     │    └─── Revision Required ──┐
     │                               │
     ▼                               │
┌──────────────┐                    │
│  SEO REVIEW  │ ← SEO Lead Review  │
└────┬────┬────┘                    │
     │    │                         │
     │    └─── Major Revisions ─────┤
     │                               │
     ▼                               │
┌──────────┐                        │
│ APPROVED │                        │
└────┬─────┘                        │
     │                               │
     ▼                               │
┌───────────┐                       │
│ PUBLISHED │                       │
└────┬──────┘                       │
     │                               │
     ├─── Needs Update ─────────────┘
     │
     ▼
┌──────────┐
│ ARCHIVED │
└──────────┘
```

---

## 3. ROLE-BASED PERMISSIONS

### Content Creator

**Can:**
- Create new content in Draft state
- Edit own Draft content
- Submit Draft for Internal Review
- Respond to review comments and revise
- View approved/published content

**Cannot:**
- Approve own content
- Advance content to SEO Review or Approved
- Publish content to production
- Archive content without approval
- Modify published content without entering revision workflow

---

### Content Reviewer (Internal)

**Can:**
- Review content in Internal Review state
- Provide comments and feedback
- Approve content to advance to SEO Review
- Request revisions (return to Draft)
- Reject content (with justification)

**Cannot:**
- Publish content to production
- Bypass SEO Review
- Approve content they created

---

### SEO Lead

**Can:**
- Review content in SEO Review state
- Run uniqueness and SEO compliance checks
- Approve content to advance to Approved/Published
- Make minor SEO fixes (title, description, metadata)
- Publish approved content to production
- Archive content
- Override workflow in exceptional cases (with documentation)

**Cannot:**
- Bypass Internal Review for new content
- Publish without SEO review (except urgent fixes)

---

### Content Systems Architect

**Can:**
- Review all content at any stage
- Audit workflow compliance
- Override workflow decisions (with documentation)
- Modify governance rules (with stakeholder approval)
- Access archived content

**Cannot:**
- Bypass governance rules without documented exception

---

## 4. VALIDATION CHECKLIST BEFORE PUBLISH

Before ANY content advances from Approved to Published, verify ALL items:

### Content Completeness
- [ ] Content meets minimum word count for page type
- [ ] All required sections present
- [ ] No placeholder text (e.g., "Lorem ipsum", "[TODO]", "[City Name]")
- [ ] All frontmatter fields populated correctly
- [ ] `status` field set to "approved"
- [ ] `publishDate` ready to be set

### Content Quality
- [ ] Grammar and spelling correct (Grammarly or similar)
- [ ] Readability score within target range (Flesch-Kincaid 8-10)
- [ ] Tone and voice match brand standards
- [ ] Canadian English spelling throughout
- [ ] No prohibited words/phrases used

### Uniqueness Compliance
- [ ] Uniqueness score ≥ threshold for page type
- [ ] No city-name swap patterns
- [ ] No paragraph spinning
- [ ] No template intro/outro (max 1 sentence)
- [ ] FAQ/review scoping validated

### SEO Compliance
- [ ] Title tag unique (<60 chars, includes target keyword)
- [ ] Meta description unique (120-160 chars, compelling CTA)
- [ ] H1 tag unique and includes target keyword
- [ ] Heading hierarchy correct (no H1 → H3 jumps)
- [ ] Target keyword naturally integrated (not stuffed)
- [ ] Internal links present (minimum required for page type)
- [ ] URL slug follows convention (lowercase, hyphens, no special chars)

### FAQ/Review Scoping
- [ ] Service-city pages have ≥3 scoped FAQs
- [ ] Service-city pages have ≥2 scoped reviews
- [ ] FAQ scope field matches page context
- [ ] Review scope field matches page context
- [ ] No duplicate FAQs across cities (same service)

### CTA Alignment
- [ ] CTAs follow conversion hierarchy (Step 7)
- [ ] Primary CTA appropriate for page type
- [ ] Emergency CTA used appropriately (not overused)
- [ ] CTA copy is action-oriented

### Emergency Usage Compliance
- [ ] Emergency keywords within limits for page type
- [ ] Emergency positioning follows governance (not emergency-first unless emergency page)
- [ ] Emergency HVAC page link present if emergency mentioned

### Schema Safety
- [ ] Content supports schema implementation
- [ ] Service type accurate (if service page)
- [ ] Location data accurate (if location page)
- [ ] Offer/price data accurate (if applicable)

### Technical Checks
- [ ] Images optimized (<200KB each)
- [ ] All images have descriptive alt text
- [ ] No broken internal links
- [ ] No broken external links
- [ ] Accessibility standards met (WCAG 2.1 AA)
- [ ] Mobile-friendly (responsive design)

### Legal & Compliance
- [ ] All claims verifiable
- [ ] Required disclaimers included (pricing, guarantees, etc.)
- [ ] No unverifiable statistics or data
- [ ] No disparagement of competitors
- [ ] Privacy policy compliance (if collecting data)

### Final Approvals
- [ ] Internal reviewer signature/timestamp
- [ ] SEO lead signature/timestamp
- [ ] Content systems architect approval (if high-value page)

---

## 5. AI USAGE RULES

### Where AI Is Allowed

AI-assisted content generation is PERMITTED in the following contexts:

**1. Drafting Phase (Draft State Only)**
- Initial content outlines
- First-draft paragraph generation
- FAQ question/answer generation
- Service description drafting
- Blog article research and structure

**Requirements:**
- Human must review and edit ALL AI output
- AI output is considered Draft state only
- Human creator is responsible for final content quality
- AI-generated content must pass all review stages

**2. Content Optimization**
- Readability improvements
- Grammar and spelling corrections
- Meta description variations
- Title tag optimization suggestions

**Requirements:**
- Human final approval required
- AI suggestions must align with brand voice

**3. Research and Ideation**
- Keyword research assistance
- Topic ideation
- Competitor content analysis
- FAQ question identification

**Requirements:**
- Human validates all research
- Sources must be verified

---

### Where AI Is Forbidden

AI MUST NOT be used for:

**1. Final Content Approval**
- AI cannot approve content for publication
- AI cannot sign off on SEO review
- AI cannot override governance rules

**2. Factual Claims Without Verification**
- Service pricing (must be verified by ops team)
- Response time commitments (must be verified by dispatch)
- Certifications and licenses (must be verified by compliance)
- Customer testimonials (must be real and verified)

**3. Bypassing Review Workflow**
- AI cannot auto-publish content
- AI cannot skip review stages
- AI cannot modify published content without human approval

**4. Legal or Compliance Content**
- Terms of service
- Privacy policy
- Service guarantees (legal implications)
- Warranty statements

**5. Sensitive or High-Stakes Content**
- Emergency HVAC page (safety-critical)
- Homepage (brand-critical)
- Legal disclaimers
- Pricing commitments

---

### AI Quality Control

When AI is used in drafting:

**Required Disclosures:**
- Content file includes `aiAssistedDraft: true` in frontmatter (removed before publish)
- First reviewer must be notified content is AI-assisted

**Enhanced Review:**
- AI-assisted content receives additional scrutiny in Internal Review
- Factual claims double-checked
- Brand voice alignment verified
- Uniqueness score must be ≥85% (higher than standard 80%)

**Prohibited AI Patterns:**
- AI fluff words (delve, unlock, elevate, empower, leverage)
- Generic introductions ("Are you looking for...")
- Listicle-style content without substance
- Keyword stuffing or unnatural phrasing

**AI Output Red Flags (Auto-Reject):**
- Unverifiable statistics ("studies show", without citation)
- Superlatives without proof ("best in", "#1")
- US English spelling (AI default is often US)
- Generic, templated conclusions
- Placeholder text left in ("insert city name here")

---

### Human Oversight Requirements

**Every AI-Assisted Content Piece MUST:**
1. Be reviewed line-by-line by human creator
2. Have all facts verified against source documents
3. Be rewritten to match brand voice (if AI voice detected)
4. Pass uniqueness checks (AI often generates similar patterns)
5. Be approved by human reviewer (not AI)

**Human Responsibility:**
- Content creator is responsible for ALL content quality, even if AI-assisted
- AI is a tool, not a replacement for human expertise
- Human must understand and stand behind all content claims

---

## 6. CONTENT REVISION WORKFLOW

### Triggering a Revision

**Published content may require revision if:**
- Information becomes outdated (service changes, pricing changes, rebates expire)
- SEO performance declines (traffic drop, ranking loss)
- Uniqueness audit flags content (post-publication duplication detected)
- Legal/compliance issue identified
- User feedback indicates inaccuracy

### Revision Process

**1. Flag for Revision**
- Change `status` to "revision_in_progress"
- Document reason for revision
- Assign to content creator or reviewer

**2. Content Update**
- Edit content file (treat as Draft state)
- Update `lastModified` field
- Add revision notes in frontmatter (optional but recommended)

**3. Review Workflow**
- **Minor revisions** (typo fix, small factual update): Internal Review only, then publish
- **Major revisions** (significant content changes, restructuring): Full workflow (Internal + SEO Review)

**4. Re-Publication**
- Update `lastModified` timestamp
- Change `status` back to "published"
- Verify changes live on production
- Notify stakeholders if high-value page

### Revision Tracking

**Recommended Frontmatter:**
```yaml
publishDate: "2024-06-15"
lastModified: "2025-01-09"
revisionHistory:
  - date: "2024-12-01"
    reason: "Updated pricing information"
    reviewer: "SEO Lead"
  - date: "2025-01-09"
    reason: "Added new FAQ, improved local context"
    reviewer: "Content Team Lead"
```

---

## 7. EMERGENCY CONTENT UPDATES

### When Immediate Updates Required

**Circumstances:**
- Legal/compliance issue (incorrect license info, misleading claim)
- Safety issue (incorrect emergency contact, unsafe advice)
- Critical factual error (wrong service area, wrong pricing)
- Reputational risk (offensive content, privacy breach)

### Emergency Update Process

**1. Immediate Action**
- SEO lead or content systems architect authorizes emergency update
- Content creator makes fix immediately
- Document emergency override in revision notes

**2. Abbreviated Review**
- SEO lead reviews change (no need for full Internal Review)
- Verify fix resolves issue
- Publish immediately

**3. Post-Emergency Audit**
- Within 24 hours, conduct full review of emergency change
- Verify no unintended consequences
- Document in audit log

**4. Process Improvement**
- Analyze why issue occurred
- Update governance rules if needed to prevent recurrence

---

## 8. BATCH PUBLISHING WORKFLOW

### When to Batch Publish

**Use Cases:**
- Launching multiple service-city pages simultaneously (e.g., all Toronto services)
- Coordinated blog article series
- Seasonal content (rebate programs, maintenance tips)

### Batch Publishing Process

**1. Batch Preparation**
- All content pieces reach "approved" state
- Verify all content in batch meets thresholds
- Check for inter-dependencies (internal links between batch content)

**2. Pre-Publish Validation**
- Run uniqueness check across entire batch (ensure new pages don't duplicate each other)
- Verify internal link structure (no broken links within batch)
- Verify sitemap and navigation updates ready

**3. Coordinated Publication**
- Publish all content in batch simultaneously (or within short window)
- Update sitemap
- Update navigation (if needed)
- Submit batch to Google Search Console

**4. Post-Publish Verification**
- Verify all pages live
- Spot-check internal links
- Monitor for indexing (48-72 hours)

---

## 9. CONTENT AUDIT AND MAINTENANCE

### Monthly Audits

**Automated Checks:**
- Uniqueness scores for all published content
- Broken link detection
- Missing alt text detection
- Outdated content flagging (>12 months since last modified)

**Manual Review:**
- Review 10% random sample of published content
- Verify ongoing compliance with governance rules
- Check for AI fluff or quality degradation

### Quarterly Audits

**Comprehensive Review:**
- Full uniqueness audit across all page types
- FAQ/review scoping validation
- Emergency content usage review
- CTA effectiveness analysis
- SEO performance review (traffic, rankings, conversions)

**Reporting:**
- Audit findings report
- Content requiring updates (prioritized)
- Process improvement recommendations

### Annual Content Refresh

**Full Site Review:**
- Review all service pages (update if needed)
- Review all service-city pages (update local context)
- Review all location pages (verify service areas)
- Review all blog articles (update outdated info, add new insights)
- Archive irrelevant content (old rebates, discontinued services)

**SEO Optimization:**
- Re-optimize title/meta for underperforming pages
- Update internal linking strategy
- Refresh high-value pages to maintain freshness signal

---

## 10. WORKFLOW EXCEPTIONS AND ESCALATIONS

### Exception Request Process

If content cannot follow standard workflow:

**1. Document Exception**
- Reason for exception (time-sensitive, unique circumstance)
- Specific workflow step(s) to be skipped or modified
- Risk assessment (what could go wrong)

**2. Approval Required**
- SEO lead approval (minimum)
- Content systems architect approval (for major exceptions)

**3. Post-Exception Audit**
- Review exception outcome
- Verify no negative impact
- Document lessons learned

### Escalation Process

If content is stuck in workflow:

**1. Identify Blocker**
- Why is content not advancing?
- Who is responsible for next action?

**2. Escalate to Next Level**
- Content creator → Content reviewer
- Content reviewer → SEO lead
- SEO lead → Content systems architect

**3. Resolution**
- Decision made within 48 hours of escalation
- Document resolution and rationale

---

## 11. WORKFLOW METRICS AND KPIs

### Efficiency Metrics

- **Average Time in Draft:** Target <3 days
- **Average Time in Internal Review:** Target <2 days
- **Average Time in SEO Review:** Target <1 day
- **Total Time to Publish:** Target <7 days (from draft creation to published)

### Quality Metrics

- **First-Pass Approval Rate:** Target >70% (content approved without major revisions)
- **Rejection Rate:** Target <10% (content rejected entirely)
- **Post-Publish Revision Rate:** Target <5% (content requiring updates within 30 days)

### Compliance Metrics

- **Uniqueness Compliance Rate:** Target 100% (no content published below threshold)
- **Governance Violation Rate:** Target 0% (no published content violates governance rules)
- **SEO Issue Rate:** Target <2% (content flagged for SEO issues post-publish)

### Reporting

- **Weekly:** Workflow status dashboard (content by state, time in each state)
- **Monthly:** Quality and compliance report
- **Quarterly:** Workflow efficiency analysis and improvement recommendations

---

## 12. TRAINING AND ONBOARDING

### New Content Creator Onboarding

**Required Training:**
1. Review all governance documents:
   - CONTENT_POPULATION_RULEBOOK.md
   - UNIQUENESS_ENFORCEMENT_MATRIX.md
   - CONTENT_APPROVAL_WORKFLOW.md
2. Shadow experienced content creator (2-3 pieces)
3. Create first draft under supervision
4. Receive enhanced review for first 5 published pieces

### Ongoing Training

**Quarterly:**
- Governance updates review (if rules changed)
- SEO best practices refresher
- Content quality workshop (review good/bad examples)

**Annual:**
- Comprehensive content strategy training
- Industry trends and updates (HVAC, SEO, content marketing)

---

## DOCUMENT VERIFICATION

**Document Created:** 2026-01-09
**Scope:** Content approval workflow and process governance for B.A.P Heating & Cooling Services Ltd
**Confirmation:** This document contains NO actual page content, NO code modifications, ONLY workflow process definitions and approval rules.

**Status:** LOCKED
**Modifications:** Require architectural review and approval

---

**END OF CONTENT APPROVAL WORKFLOW**
