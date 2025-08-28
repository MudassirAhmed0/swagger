# ADR 001: Contract Strategy

**Status:** Accepted  
**Date:** 2025-08-28  
**Decision owner (API Owner):** Mudassir (mudassir0ahmed1@gmail.com)

## Context
-We need to decide how to manage our API specs.

## Decision
-We will use **code-first** for now.

## Rationale
-Fast for one team; we can flip specific domains to contract-first if external partners join.

## Consequences
-Spec follows code. Breaking changes must bump version or mark deprecated.