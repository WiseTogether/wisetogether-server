# Changelog

All notable changes to the WiseTogether server directory are documented here.

---

## [Unreleased]

### Added
- New API endpoint: `POST /expenses/parse-receipt` for automated receipt parsing [#9](https://github.com/WiseTogether/wisetogether-server/issues/9)

### Changed
- Updated environment variables to include OpenAI API key requirement

---

## [2025-06-08]

### Added
- Middleware for Supabase token verification [#2](https://github.com/WiseTogether/wisetogether-server/issues/2) ([#4](https://github.com/WiseTogether/wisetogether-server/pull/4))
- New API endpoint: `PATCH /transactions/:id` for editing transactions [#1](https://github.com/WiseTogether/wisetogether-server/issues/1) ([#5](https://github.com/WiseTogether/wisetogether-server/pull/5))
- New API endpoint: `DELETE /transactions/:id` for deleting transactions [#3](https://github.com/WiseTogether/wisetogether-server/issues/3) ([#8](https://github.com/WiseTogether/wisetogether-server/pull/8))

### Changed
- Refactor expense creation response [#6](https://github.com/WiseTogether/wisetogether-server/issues/6) ([#7](https://github.com/WiseTogether/wisetogether-server/pull/7))