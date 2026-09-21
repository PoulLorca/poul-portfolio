---
title: "Agente o cron: cuándo la IA sobra"
description: "No todo necesita IA. Un reporte diario de ventas se resuelve con un cron y un script, a USD 0 en tokens. Cómo decidirlo en 2 minutos."
date: 2026-11-10
tema: "agentes"
tipo: "comparativa"
tags: ["agentes", "cron", "decisiones"]
herramientas: ["cron", "Python"]
image: "/blogs/quest.png"
videoUrl: "https://www.youtube.com/watch?v=placeholder2"
destacado: false
draft: true
---

# Agente o cron: cuándo la IA sobra

Me lo preguntan casi cada semana: "¿esto lo resuelvo con un agente de IA?". La respuesta corta, el 70% de las veces, es **no: basta un cron con un script**.

## La prueba de los 3 filtros

Antes de escribir una línea de código, responde:

1. **¿La entrada es predecible?** Si siempre llegan los mismos campos (CSV, webhook, correo con formato), no necesitas IA.
2. **¿La salida tiene reglas claras?** "Agrupa por producto y suma" es un script. "Resume qué pasó en lenguaje natural" es IA.
3. **¿Qué pasa cuando falla?** Un script falla en silencio y lo arreglas en 5 minutos. Un agente falla *convencido de que acertó*.

## El caso concreto: reporte diario de ventas

- Entrada: export de ventas a las 23:00.
- Salida: tabla + 3 números en el canal del equipo.
- Reglas: fijas, siempre iguales.

Resultado: `cron + script`, **USD 0 en tokens**, corre desde el primer día.

## Cuándo SÍ meter un agente

- El texto de entrada varía (correos de clientes, tickets, PDFs distintos).
- Necesitas interpretar: priorizar, clasificar, decidir a quién escalar.
- Las reglas cambiarían cada semana si las escribieras a mano.

## Mi regla

> Automatiza con un script lo determinista. Delega a un agente lo ambiguo. Si dudas, empieza con el script y súbele la IA solo al paso que se resiste.

El video muestra el mismo reporte resuelto de las dos formas, con las cuentas de cada una.
