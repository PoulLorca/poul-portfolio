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

Conciliar facturas es de esas tareas que nadie quiere pero alguien tiene que hacer cada semana: comparar montos, buscar la transferencia que no aparece y perseguir comprobantes. En el negocio con el que probé esto eran **6 horas semanales** de una persona.

## El problema real

No es la conciliación en sí. Es que es *repetitiva con excepciones*: el 90% de las facturas cuadran solas y el 10% te quita la tarde.

## La solución que monté

Un agente con un cron diario que:

1. Descarga las facturas nuevas del correo.
2. Las compara contra los movimientos del banco.
3. Marca las que cuadran y deja las dudas en una lista corta.
4. Envía un resumen de 5 líneas al correo del encargado.

La clave: el agente **no decide nada**. Solo junta la información y avisa. La decisión la toma una persona con contexto.

## El costo de operar

- ~1.200 llamadas al modelo al mes, prompt + respuesta
- Modelo económico para clasificación, modelo bueno solo para las dudas
- Base de datos en el mismo servidor que ya pagaban

**Total: ~USD 8/mes en tokens.** El servidor ya existía. Se paga solo en la primera semana que ahorra.

## Cuándo NO hacerlo

- Si facturas menos de ~50 al mes: hazlo a mano.
- Si los montos no tienen patrón: primero ordena el proceso, después automatiza.
- Si nadie del equipo revisa los avisos: automatizar algo que nadie mira es tirar plata.

## Checklist para replicarlo

- [ ] Define qué significa "cuadra" con reglas claras
- [ ] Empieza en modo lectura: solo avisa, no toca nada
- [ ] Mide una semana antes de dejarlo solo
- [ ] Documenta qué hace cuando algo no cuadra

En el video monto todo desde cero y comparto el repositorio con el agente completo.
