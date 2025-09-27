![License](https://img.shields.io/badge/license-MIT-blue)
![Issues](https://img.shields.io/github/issues/leptio/Resumi)
![Last Commit](https://img.shields.io/github/last-commit/leptio/Resumi)

# Resumi

Resumi is a fully client-side, open-source resume builder that runs entirely in the browser. It never sends data to a server or logs any kind of user data.

## Table of Contents
- [Motivation](#motivation)
- [Features](#features)
- [Usage](#usage)
- [Architecture & Design](#architecture--design)
---

## Motivation
Existing resume builders, although sometimes free, often require storing user data or communicating with servers. Resumi, inspired by free and open-source philosophy, cuts away telemetry, log-ins, and all other popular retention-based or profit-driven designs. Our project provides a fast, simple, and entirely client-side solution for creating a resume.

---

## Features
- Pure client-side operation
- Templates / styling options (via CSS / Tailwind)
- Export generated resume via PDF
- Customizable layout, color, typography
- Lightweight (minimal dependencies)
- Privacy-first (no telemetry or data logging)

---

## Usage

Resumi is freely available for use on our [live website.](https://resumi.net) 

---

## Architecture & Design

- Built with standard web technologies: HTML, CSS (Tailwind), JavaScript
- Uses client-side logic for template rendering
- No server component, no database
- All assets, scripts, and styles are bundled and delivered statically
- Modular design to allow adding / swapping templates or style modules
