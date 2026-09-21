---
title: "¿Vale la pena automatizar la conciliación de facturas?"
description: "Un agente revisa tus facturas cada día, las concilia y te avisa solo cuando algo no cuadra. Cuánto cuesta operarlo y cuándo se paga solo."
date: 2026-11-03
tema: "agentes"
tipo: "tutorial"
tags: ["agentes", "automatización", "facturas"]
herramientas: ["OpenAI API", "cron", "PostgreSQL"]
image: "/blogs/default.jpg"
videoUrl: "https://www.youtube.com/watch?v=placeholder1"
repoUrl: "https://github.com/poullorca/conciliador-facturas"
capitulos:
  - tiempo: "00:00"
    titulo: "El problema: 6 horas a la semana conciliando"
  - tiempo: "02:15"
    titulo: "Qué delega el agente y qué no"
  - tiempo: "06:40"
    titulo: "El costo real de operar: ~USD 8/mes"
destacado: true
draft: true
---

# ¿Vale la pena automatizar la conciliación de facturas?

Pieza de ejemplo (`draft: true`). Publicación prevista para el lanzamiento del 3 de noviembre.

## El problema

Conciliar facturas se come unas 6 horas a la semana: comparar montos, buscar diferencias, perseguir comprobantes.

## La solución

Un agente con un cron diario que revisa las facturas nuevas, las concilia contra el sistema y te avisa solo cuando algo no cuadra.

## El costo real

Operar este agente cuesta alrededor de USD 8 al mes en tokens. Se paga en la primera semana.
