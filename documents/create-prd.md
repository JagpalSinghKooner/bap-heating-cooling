# Create a Product Requirements Document (PRD)

## Goal

Create a detailed Product Requirements Document based on the user's initial feature request. The PRD should be clear, actionable, and suitable for a junior developer to understand and implement.

## Process

1. **Receive Initial Prompt:** The user has described a feature or functionality they want.

2. **Ask Clarifying Questions:** Before writing the PRD, ask clarifying questions to gather sufficient detail. Adapt questions based on the prompt, but explore areas like:
   - **Problem/Goal:** "What problem does this feature solve?" or "What is the main goal?"
   - **Target User:** "Who is the primary user of this feature?"
   - **Core Functionality:** "What key actions should a user be able to perform?"
   - **User Stories:** "Can you provide user stories? (e.g., As a [user], I want to [action] so that [benefit].)"
   - **Acceptance Criteria:** "How will we know this is successfully implemented?"
   - **Scope/Boundaries:** "What should this feature *not* do (non-goals)?"
   - **Data Requirements:** "What data does this feature need to display or manipulate?"
   - **Design/UI:** "Are there mockups or UI guidelines to follow?"
   - **Edge Cases:** "Any edge cases or error conditions to consider?"

3. **Wait for Answers:** Do not proceed until the user answers your clarifying questions.

4. **Generate PRD:** Based on the initial prompt and user's answers, generate the PRD using the structure below.

5. **Save PRD:** Save the document as `tasks/prd-[feature-name].md` (create the `tasks` directory if it doesn't exist).

## PRD Structure

```markdown
# PRD: [Feature Name]

## Introduction/Overview
Briefly describe the feature and the problem it solves. State the goal.

## Goals
List specific, measurable objectives for this feature.

## User Stories
Detail user narratives describing feature usage and benefits.

## Functional Requirements
List specific functionalities the feature must have. Use clear, concise language. Number these requirements.

1. The system must...
2. The system must...

## Non-Goals (Out of Scope)
Clearly state what this feature will *not* include.

## Design Considerations
Link to mockups, describe UI/UX requirements, or mention relevant components/styles if applicable.

## Technical Considerations
Mention any known technical constraints, dependencies, or suggestions.

## Success Metrics
How will success be measured?

## Open Questions
List any remaining questions or areas needing further clarification.
```

## Important

1. Do NOT start implementing the PRD
2. Make sure to ask clarifying questions FIRST
3. Take the user's answers and improve the PRD before finalizing
4. Assume the reader is a junior developer - be explicit and avoid jargon
