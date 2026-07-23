# Reglas de fechas límite — Calendario contributivo PR

Documento de referencia interna para el **Calendario contributivo de Puerto Rico** de SL Accounting Services PR.

Describe cómo el sistema calcula, ajusta y muestra las fechas límite de obligaciones contributivas. La lógica vive en dos archivos principales:

| Archivo | Rol |
|---------|-----|
| `assets/js/tax-calendar-pr-rules.js` | Catálogo de **62 obligaciones** y sus reglas de vencimiento |
| `assets/js/main.js` | **Motor de cálculo** que convierte reglas en eventos de calendario |

Herramienta pública: `/herramientas/calendario-contributivo-pr/`

---

## 1. Principios generales

1. **Solo reglas de cumplimiento general.** No se almacenan datos de clientes, contribuyentes, EIN, SSN ni información privada.
2. **Herramienta informativa, no oficial.** Las fechas pueden variar por feriados, cambios de ley, prórrogas, facturas, municipios o circunstancias particulares. Siempre validar con fuentes oficiales (Hacienda PR, IRS, CRIM, DTRH, etc.).
3. **Zona horaria local del navegador.** Todas las fechas se normalizan a medianoche local (`startOfDay`).
4. **Ventana de años generados.** El calendario genera eventos para el año visible **más el año anterior y el siguiente** (tres años en total) para permitir navegación sin huecos.
5. **Feriados aún no implementados.** El ajuste por fin de semana está activo; los feriados oficiales de PR y federales están marcados como fase futura en el código.

---

## 2. Estructura de cada regla (`taxCalendarRules`)

Cada obligación es un objeto JSON con estos campos:

| Campo | Obligatorio | Descripción |
|-------|-------------|-------------|
| `id` | Sí | Identificador único interno (slug) |
| `sourceKey` | Sí | Nombre canónico en la lista maestra de obligaciones |
| `title` | Sí | Título visible en el calendario |
| `agency` | Sí | Agencia responsable (Hacienda PR, IRS/Federal, CRIM, DTRH, etc.) |
| `appliesTo` | Sí | Audiencia: `Individuo`, `Negocio`, `Patronal` (puede ser combinación) |
| `frequency` | Sí | Periodicidad (ver sección 3) |
| `ruleType` | Sí | Tipo de regla de cálculo (ver sección 4) |
| `adjustmentRule` | Sí | Regla de ajuste de fecha (ver sección 5) |
| `dueRuleText` | Sí | Texto corto legible para humanos (ej. `Día 15 \| del mes siguiente`) |
| `notes` | Sí | Contexto, excepciones y advertencias |
| `sourceConfirmed` | Sí | `true` / `false` — si la fuente fue validada |
| `sourceStatus` | Sí | `confirmed` o `pending_review` |
| `requiresReview` | Sí | Si la obligación necesita revisión manual antes de confiar en la fecha |
| Campos numéricos | Según tipo | `day`, `month`, `dates`, `startMonth`, `endMonth`, `baseMonth`, `businessDaysAfter`, `approximateMonth` |

### Validación automática

Al cargar el calendario, `validateCalendarRulesCompleteness()` verifica:

- Obligaciones del checklist maestro sin regla cargada
- Duplicados de `sourceKey`
- Reglas sin `ruleType`, `agency`, `frequency` o `dueRuleText`
- Conteo de fuentes confirmadas vs. pendientes
- Conteo de reglas con `requiresReview: true`

El resultado se muestra en el panel **Data técnica** del calendario.

---

## 3. Frecuencias (`frequency`)

| Valor | Significado en UI |
|-------|-------------------|
| `mensual` | Mensual |
| `trimestral` | Trimestral |
| `anual` | Anual |
| `semestral` | Semestral |
| `una_sola_vez` | Una sola vez |
| `por_transacción` | Por transacción |
| `mensual___bisemanal` | Mensual / bisemanal (según perfil de depositante) |

La frecuencia **no cambia el cálculo** por sí sola; define el contexto. El cálculo lo determina `ruleType` y sus campos asociados.

---

## 4. Tipos de regla (`ruleType`)

El motor (`generateEventsForYear`) convierte cada regla en uno o más **eventos** con una `dueDate` concreta.

### 4.1 `fixed_day_monthly` — Día fijo cada mes

**Campos:** `day` (1–31)

**Lógica:** Genera **12 eventos por año**, uno por cada mes, en el día indicado.

**Ejemplos:**
- IVU — día **20** de cada mes
- Form 480.9 — día **15** del mes siguiente (modelado como día 15 de cada mes)
- Room Tax — día **10** de cada mes

```
Para año 2026, day=20 → 20 ene, 20 feb, 20 mar, … 20 dic
```

---

### 4.2 `fixed_annual` — Fecha fija anual

**Campos:** `month` (1–12), `day` (1–31)

**Lógica:** Genera **1 evento por año**.

**Ejemplos:**
- Planilla de individuos — **15 de abril**
- Planilla propiedad mueble (CRIM) — **15 de mayo**
- LLC Annual Report — **15 de abril**
- FBAR (FinCEN 114) — **15 de abril**

---

### 4.3 `fixed_quarterly` — Fechas trimestrales fijas

**Campos:** `dates` — arreglo de `{ month, day }`

**Lógica:** Genera un evento por cada entrada en `dates`.

**Regla especial de año (Q4 en enero):** Si `frequency === 'quarterly'` y `date.month === 1`, el evento se asigna al **año siguiente** (`year + 1`). Esto refleja que el cierre del Q4 vence en enero del año fiscal siguiente.

**Ejemplo — PR-UI-10 (desempleo):**
| Trimestre | Vencimiento |
|-----------|-------------|
| Q1 | 30 de abril |
| Q2 | 31 de julio |
| Q3 | 31 de octubre |
| Q4 | 31 de enero (año siguiente) |

**Ejemplo — TSCH-1 (choferes):** Q1→15 abr, Q2→15 jul, Q3→15 oct, Q4→15 ene.

---

### 4.4 `quarterly_specific_dates` — Fechas trimestrales específicas (sin rollover de enero)

**Campos:** `dates` — arreglo de `{ month, day }`

**Lógica:** Igual que `fixed_quarterly`, pero **sin** la regla de `year + 1` para enero. Todas las fechas pertenecen al mismo año generado.

**Ejemplos:**
- Contribución estimada (individuos y corporaciones PR): 15 abr, 15 jun, 15 sep, 15 ene
- Contribución estimada federal (self-employed): mismas fechas
- Propiedad mueble estimada (CRIM): 15 nov, 15 feb, 15 may

> **Nota:** La contribución estimada con vencimiento 15 de enero se modela en el **mismo año calendario** que se está generando (ej. ene 2026 al generar 2026), no en 2027.

---

### 4.5 `semiannual_specific_dates` — Fechas semestrales específicas

**Campos:** `dates` — arreglo de `{ month, day }`

**Lógica:** Misma implementación que `fixed_quarterly` / `quarterly_specific_dates` (sin rollover especial). Reservado para obligaciones semestrales con fechas fijas predefinidas.

---

### 4.6 `date_window` — Ventana de fechas

**Campos:** `startMonth`, `startDay`, `endMonth`, `endDay`

**Lógica:**
- El evento se coloca en la **fecha de inicio** de la ventana (`startMonth` / `startDay`).
- Se guarda además `windowEndDate` con la fecha de fin ajustada.

**Uso en calendario:** Solo la fecha de inicio aparece en la grilla mensual. La ventana completa se documenta en `dueRuleText` y `notes`.

**Ejemplos:**
| Obligación | Ventana |
|------------|---------|
| Bono de Navidad | 15 nov – 15 dic |
| Patente municipal (1er semestre) | 1–15 de julio |
| CFSE — Declaración de nómina | 1 jul – 15 ago |
| Municipal Tax License | Primeros 15 días de julio / enero |

---

### 4.7 `relative_to_date` — Días laborables después de una fecha base

**Campos:** `baseMonth`, `baseDay`, `businessDaysAfter`

**Lógica:**
1. Partir de la fecha base (`baseMonth` / `baseDay`).
2. Sumar `businessDaysAfter` **días laborables** (lunes–viernes; sábado y domingo no cuentan).
3. Aplicar `adjustmentRule` al resultado.

**Ejemplos:**
| Obligación | Regla |
|------------|-------|
| Patente municipal — declaración de volumen | 5 días laborables después del 15 de abril |
| Informe anual de negocios exentos | 5 días laborables después del 15 de junio |

**Ejemplo numérico (2026):** Base 15 abr + 5 días laborables → **22 de abril de 2026** (si no cae en fin de semana).

---

### 4.8 `manual_review` — Revisión manual / fecha no automatizable

**Campos opcionales:** `approximateMonth`

**Lógica:**
- **Sin `approximateMonth`:** No se genera ningún evento en el calendario. La obligación aparece solo en la cola de **Revisión interna** y en la tabla técnica.
- **Con `approximateMonth`:** Se genera **1 evento aproximado** el día **1** de ese mes, marcado con `isApproximate: true`.

**Obligaciones sin evento automático (solo revisión):**
- SC 2225 — Excise Tax (día 10–12 variable por mes)
- Depósito Federal — Income Tax & FICA (mensual/bisemanal según lookback)
- Depósito retención — corporación afiliada no residente (por transacción)
- Real Property Tax — 1er y 2do semestre (1 jul / 1 ene, requiere validación)

**Obligaciones con fecha aproximada:**
- CFSE — 2do pago semestral → `approximateMonth: 2` (febrero)
- Exempt Corporation Annual Report → `approximateMonth: 11` (noviembre)

---

### 4.9 `variable` — Fecha dependiente de condición externa

**Lógica:** Igual que `manual_review` sin `approximateMonth` — **no genera eventos** salvo que tenga `approximateMonth`.

**Ejemplo:** BOI (FinCEN) — 30 días calendario tras registro efectivo; con `adjustmentRule: review_registration_date` (sin cálculo automático).

---

## 5. Reglas de ajuste (`adjustmentRule`)

Después de calcular la fecha bruta, `adjustDueDate()` puede modificarla:

| Valor | Comportamiento |
|-------|----------------|
| `next_business_day_if_weekend` | Si cae en **sábado** → lunes (+2 días). Si cae en **domingo** → lunes (+1 día). Si es día laborable → sin cambio. |
| `review_notice_or_invoice` | **Sin ajuste automático.** La fecha real depende de notificación, factura o municipio. |
| `review_registration_date` | **Sin ajuste automático.** La fecha depende de un evento externo (ej. fecha de registro de entidad). |

### Días laborables (`addBusinessDays`)

Usado en `relative_to_date`:
- Solo cuenta lunes a viernes.
- No salta feriados (pendiente de fase futura).

### Feriados — fase futura

El código incluye el comentario:

```javascript
// Future phase: apply official Puerto Rico and federal holidays here.
```

Hoy, si el 15 de abril cae en sábado, se mueve al lunes 17. Si además fuera feriado oficial, **aún no se ajusta**.

---

## 6. Cómo se muestran las fechas en la interfaz

### 6.1 Urgencia (`getUrgency`)

| Días restantes | Etiqueta | Clase CSS |
|----------------|----------|-----------|
| &lt; 0 | Vencido | `overdue` |
| 0–7 | Crítico | `critical` |
| 8–30 | Pronto | `soon` |
| &gt; 30 | Normal | `normal` |

### 6.2 Agenda de próximos vencimientos

Rangos disponibles:

| Rango | Criterio |
|-------|----------|
| Próximos 7 días | `daysRemaining <= 7` (máx. 10 resultados) |
| Próximos 30 días | `daysRemaining <= 30` (máx. 10) |
| Este mes | Mismo mes y año que hoy |
| Todo el año | Mismo año que la vista del calendario |

**Exclusión en dashboard y agenda:** Los eventos con `requiresReview: true` **se ocultan** de “Próximo vencimiento” y de la agenda, **excepto** si tienen `isApproximate: true` (fechas aproximadas de `manual_review`).

### 6.3 Marca de revisión (`*`)

Se muestra un asterisco cuando:
- `sourceStatus !== 'confirmed'`, o
- `requiresReview === true`

### 6.4 Filtros

| Filtro | Criterio |
|--------|----------|
| Todas | Sin filtro |
| Individuo / Negocio / Patronal | `appliesTo` incluye el valor |
| Hacienda PR, CRIM, IRS/Federal, etc. | `agency` coincide |
| Fuente confirmada | `sourceStatus === 'confirmed'` |
| Pendiente de revisión | `sourceStatus !== 'confirmed'` |
| Requiere revisión | `requiresReview === true` |

---

## 7. Estado de las fuentes

| `sourceStatus` | Significado |
|----------------|-------------|
| `confirmed` | La regla de vencimiento fue validada contra fuente oficial o referencia confiable |
| `pending_review` | Pendiente de confirmación; la fecha puede cambiar |

| `requiresReview` | Significado |
|------------------|-------------|
| `false` | Fecha calculada automáticamente; apta para mostrarse en agenda |
| `true` | Incluida en el sistema pero **no debe tratarse como fecha exacta garantizada** hasta validar notificación, factura, municipio o condición específica |

---

## 8. Resumen por tipo de regla (conteo actual)

| `ruleType` | Cantidad aprox. | Genera eventos automáticos |
|------------|-----------------|----------------------------|
| `fixed_annual` | ~22 | Sí |
| `fixed_day_monthly` | ~8 | Sí (×12) |
| `fixed_quarterly` | ~6 | Sí |
| `quarterly_specific_dates` | ~7 | Sí |
| `date_window` | ~4 | Sí (fecha inicio) |
| `relative_to_date` | 2 | Sí |
| `manual_review` | ~8 | Solo si tiene `approximateMonth` |
| `variable` | 1 | No |
| `semiannual_specific_dates` | 0 | — |

**Total obligaciones en catálogo:** 62 (alineadas con el checklist maestro en `sourceObligationChecklist`).

---

## 9. Ejemplos de cálculo paso a paso

### Ejemplo A — IVU mensual (20 de cada mes, cae en domingo)

```
ruleType: fixed_day_monthly
day: 20
adjustmentRule: next_business_day_if_weekend

Abril 2026: 20 abr = lunes → 20 abr 2026
Junio 2026: 20 jun = sábado → 22 jun 2026 (lunes)
```

### Ejemplo B — Contribución estimada PR

```
ruleType: quarterly_specific_dates
dates: [{4,15}, {6,15}, {9,15}, {1,15}]
adjustmentRule: next_business_day_if_weekend

Año 2026 → 15 abr, 15 jun, 15 sep, 15 ene 2026
```

### Ejemplo C — Desempleo PR-UI-10 Q4

```
ruleType: fixed_quarterly
frequency: trimestral
dates incluye { month: 1, day: 31 }

Al generar año 2025 → Q4 vence 31 ene 2026 (year + 1)
```

### Ejemplo D — Bono de Navidad

```
ruleType: date_window
start: 15 nov, end: 15 dic

Evento en calendario: 15 nov (inicio de ventana)
windowEndDate: 15 dic (ajustada si fin de semana)
```

### Ejemplo E — SC 2225 Excise Tax

```
ruleType: manual_review
(sin approximateMonth)

→ No aparece en grilla ni agenda
→ Aparece en "Obligaciones que requieren revisión"
→ dueRuleText: "Día 10-12 | de cada mes"
```

---

## 10. Limitaciones conocidas

1. **Feriados no modelados** — Solo se ajusta fin de semana.
2. **Ventanas de fecha** — Solo se marca el inicio en la grilla; el usuario debe leer `dueRuleText` para el rango completo.
3. **Obligaciones `manual_review` sin mes aproximado** — No tienen representación visual en el calendario mensual.
4. **Depositantes bisemanales** — Depósitos federales y algunos de Hacienda con frecuencia variable no se automatizan.
5. **Municipios** — Fechas pueden variar por municipio (patente, volumen de negocios).
6. **CRIM / facturas** — Propiedad inmueble y estimados de mueble dependen de notificación o factura.
7. **Cambios de ley** — Ej. BOI exento para entidades domésticas desde marzo 2025; requiere actualización manual de `notes` y posible cambio de `ruleType`.

---

## 11. Cómo agregar o modificar una regla

1. Agregar el nombre a `sourceObligationChecklist` si es obligación nueva.
2. Crear el objeto en `taxCalendarRules` con todos los campos obligatorios.
3. Elegir el `ruleType` correcto y los campos numéricos asociados.
4. Definir `adjustmentRule` según si la fecha es fija o depende de notificación.
5. Marcar `sourceStatus` y `requiresReview` según el nivel de certeza.
6. Verificar en consola del navegador el resultado de `Calendar Rules Validation`.
7. Probar en `/herramientas/calendario-contributivo-pr/` con filtros y navegación de meses.

### Plantilla mínima — fecha fija anual

```json
{
  "id": "ejemplo-anual",
  "sourceKey": "Ejemplo — Obligación Anual",
  "title": "Ejemplo — Obligación Anual",
  "agency": "Hacienda PR",
  "appliesTo": ["Negocio"],
  "frequency": "anual",
  "ruleType": "fixed_annual",
  "adjustmentRule": "next_business_day_if_weekend",
  "sourceConfirmed": false,
  "sourceStatus": "pending_review",
  "dueRuleText": "15 de abril",
  "notes": "Descripción y excepciones.",
  "requiresReview": true,
  "month": 4,
  "day": 15
}
```

---

## 12. Descargo de responsabilidad (texto público del calendario)

> Estas obligaciones están incluidas en el sistema, pero no deben tratarse como fechas exactas garantizadas hasta validar notificación, factura, municipio, regla de agencia o condición específica.

> Es una referencia informativa general. Valida siempre con fuentes oficiales de Hacienda PR y las agencias correspondientes.

---

*Última revisión del documento: junio 2026 · Basado en `tax-calendar-pr-rules.js` y motor en `main.js`.*
