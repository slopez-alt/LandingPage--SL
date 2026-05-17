// Centralized Puerto Rico tax calendar rules for SL Accounting Services PR.
// Public-safe general compliance rules only. No client, taxpayer, credential, EIN, SSN, or private data.
(function(){
  const sourceObligationChecklist = [
  "SC 2225 — Monthly Excise Tax Return",
  "Form 480.9 — Retención Dividendos, Distribuciones e Intereses",
  "Form 480.31 — Depósito Retención No Residentes",
  "Form 480.32 — Depósito Retención Regalías No Residentes",
  "PR-UI-10 / PR-UI-10A — Desempleo & Disability Benefits",
  "TSCH-1 — Chauffeur's Social Security",
  "Form 480.9EC — Retención Distributable Share Pass-Through",
  "Form 480.5 — Summary of Informative Returns",
  "Form 480.7A — Mortgage Interest Informative",
  "Form 480.7D — Automobile Lease Payments",
  "Form SC 2788 B — Gift Tax Return (Donaciones)",
  "Form 480.6SP.2 — Annual Reconciliation Services Rendered",
  "Form 480.7B.1 / 480.7C.1 — Reconciliation IRA & Retirement Plans",
  "Form 480.20(EC) — Pass-Through Entity Income Tax Return",
  "Form 482.0(C) — Composite Return",
  "Form 480.80 — Fiduciary Income Tax Return",
  "FinCEN Form 114 — FBAR Foreign Bank Account Report",
  "Form 480.30(II) — Exempt Businesses Income Tax Return",
  "Form 480.7(OE) — Informative Return Exempt Organizations",
  "Form 480.60(F) / 480.80(F) — Revocable/Grantor Trust",
  "Forms 480.7 / 480.7B / 480.7C — IRA, Educational & Retirement",
  "IVU — Impuesto sobre Ventas y Uso",
  "Room Tax — Canon por Ocupación de Habitación",
  "499 R-1 — Depósito Mensual Income Tax Retenido",
  "Depósito Federal — Income Tax & FICA",
  "480.9A — Depósito Retención sobre Servicios Profesionales",
  "Depósito Retención — Corporación Afiliada No Residente",
  "499 R-1B — Planilla Trimestral Patronal de Contribución Retenida",
  "Form 941 — Planilla Trimestral del Patrono",
  "480.6 SP-1 — Quarterly Return Tax Withheld on Services",
  "Disability Insurance — AS-6",
  "Contribución Estimada — Individuos PR",
  "Contribución Estimada — Corporaciones PR",
  "Contribución Estimada Federal — Self-Employed",
  "Depósito FUTA — Trimestral",
  "Form 940 — FUTA Anual",
  "Form 943 — Empleados Agrícolas",
  "W-2 PR (499R-2) & W-3 PR — Comprobantes de Retención",
  "499 R-3 — Annual Reconciliation Income Tax Withheld",
  "Chauffeur's Insurance — Seguro de Choferes",
  "Declaraciones Informativas",
  "480.6B.1 — Annual Reconciliation Withholding on Services",
  "State Insurance Fund (CFSE) — 2do Pago Semestral",
  "Planilla Pass-Through Entity (Entidad Conducto)",
  "Planilla de Individuos — Hacienda PR",
  "Planilla de Corporación — Hacienda PR",
  "Form 1040-SS — Self-Employment Tax Return PR",
  "Planilla Federal Individuo — IRS Form 1040",
  "480.30 — Annual Return Withholding Non-Residents",
  "Patente Municipal — Declaración de Volumen de Negocios",
  "Informe Anual de Corporación / LLC Annual Report",
  "Planilla Propiedad Mueble (CRIM)",
  "Informe Anual de Negocios Exentos",
  "Planilla Exempt Corporation / Org. Exenta",
  "State Insurance Fund (CFSE) — Declaración de Nómina",
  "Real Property Tax (CRIM — Inmueble) — 1er Semestre",
  "Municipal Tax License — 1er Semestre",
  "BOI — Beneficial Ownership Information",
  "Christmas Bonus — Bono de Navidad",
  "Exempt Corporation / Individual Annual Report",
  "Real Property Tax — 2do Semestre",
  "Estimated Property Tax — Propiedad Mueble Estimada"
];

  const taxCalendarRules = [
  {
    "id": "sc-2225-monthly-excise-tax-return",
    "sourceKey": "SC 2225 — Monthly Excise Tax Return",
    "title": "SC 2225 — Monthly Excise Tax Return",
    "agency": "Hacienda PR",
    "appliesTo": [
      "Negocio"
    ],
    "frequency": "mensual",
    "ruleType": "manual_review",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": false,
    "sourceStatus": "pending_review",
    "dueRuleText": "Día 10-12 | de cada mes",
    "notes": "Planilla mensual de contribución sobre arbitrios (excise tax). Radicación y pago electrónico a través de SURI. La fecha exacta varía mensualmente — Grant Thornton 2026 la lista en distintos días según el mes (10, 11 o 12). Regla fin de semana aplica → próximo día laborable.",
    "requiresReview": true
  },
  {
    "id": "form-480-9-retencion-dividendos-distribuciones-e-intereses",
    "sourceKey": "Form 480.9 — Retención Dividendos, Distribuciones e Intereses",
    "title": "Form 480.9 — Retención Dividendos, Distribuciones e Intereses",
    "agency": "Hacienda PR",
    "appliesTo": [
      "Patronal"
    ],
    "frequency": "mensual",
    "ruleType": "fixed_day_monthly",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "Día 15 | del mes siguiente",
    "notes": "Pago de income tax retenido sobre dividendos de corporaciones, distribuciones de sociedades, intereses y penalidad del 10% sobre IRA. Vence el día 15 del mes siguiente. Radicación electrónica a través de SURI. Regla fin de semana aplica.",
    "requiresReview": false,
    "day": 15
  },
  {
    "id": "form-480-31-deposito-retencion-no-residentes",
    "sourceKey": "Form 480.31 — Depósito Retención No Residentes",
    "title": "Form 480.31 — Depósito Retención No Residentes",
    "agency": "Hacienda PR",
    "appliesTo": [
      "Patronal"
    ],
    "frequency": "mensual",
    "ruleType": "fixed_day_monthly",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "Día 15 | del mes siguiente",
    "notes": "Cupón de depósito de income tax retenido a personas no residentes (individuos y corporaciones extranjeras) por el mes anterior. Solo aplica si la cantidad retenida excede $200. Radicación electrónica. Regla fin de semana aplica.",
    "requiresReview": false,
    "day": 15
  },
  {
    "id": "form-480-32-deposito-retencion-regalias-no-residentes",
    "sourceKey": "Form 480.32 — Depósito Retención Regalías No Residentes",
    "title": "Form 480.32 — Depósito Retención Regalías No Residentes",
    "agency": "Hacienda PR",
    "appliesTo": [
      "Patronal"
    ],
    "frequency": "mensual",
    "ruleType": "fixed_day_monthly",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "Día 15 | del mes siguiente",
    "notes": "Cupón de depósito de income tax retenido sobre regalías pagadas a no residentes bajo la Sección 6(k) de la Ley de Incentivos Contributivos de 1998. Vence el día 15 del mes siguiente. Radicación electrónica. Regla fin de semana aplica.",
    "requiresReview": false,
    "day": 15
  },
  {
    "id": "pr-ui-10-pr-ui-10a-desempleo-and-disability-benefits",
    "sourceKey": "PR-UI-10 / PR-UI-10A — Desempleo & Disability Benefits",
    "title": "PR-UI-10 / PR-UI-10A — Desempleo & Disability Benefits",
    "agency": "DTRH",
    "appliesTo": [
      "Patronal"
    ],
    "frequency": "trimestral",
    "ruleType": "fixed_quarterly",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "Último día | del mes siguiente al trimestre",
    "notes": "Planilla trimestral de Seguro de Desempleo (PR Unemployment Insurance) y Beneficios por Incapacidad. Q1→30 abr · Q2→31 jul · Q3→31 oct · Q4→31 ene. Radicación electrónica a través del portal del DTRH. Tasa patronal: 1.0% a 4.4% regular + 1.0% especial (hasta 5.4%) sobre primeros $7,000 por empleado. Regla fin de semana aplica.",
    "requiresReview": false,
    "dates": [
      {
        "month": 4,
        "day": 30
      },
      {
        "month": 7,
        "day": 31
      },
      {
        "month": 10,
        "day": 31
      },
      {
        "month": 1,
        "day": 31
      }
    ]
  },
  {
    "id": "tsch-1-chauffeur-s-social-security",
    "sourceKey": "TSCH-1 — Chauffeur's Social Security",
    "title": "TSCH-1 — Chauffeur's Social Security",
    "agency": "DTRH",
    "appliesTo": [
      "Patronal"
    ],
    "frequency": "trimestral",
    "ruleType": "fixed_quarterly",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "Día 15 | del mes siguiente al trimestre",
    "notes": "Pago trimestral del Seguro Social de Choferes y otros empleados. Q1→15 abr · Q2→15 jul · Q3→15 oct · Q4→15 ene. Aplica a patronos de choferes y empleados cubiertos bajo la ley de choferes PR. Empleado: $0.30/semana; Patrono: $0.50/semana. Regla fin de semana aplica.",
    "requiresReview": false,
    "dates": [
      {
        "month": 4,
        "day": 15
      },
      {
        "month": 7,
        "day": 15
      },
      {
        "month": 10,
        "day": 15
      },
      {
        "month": 1,
        "day": 15
      }
    ]
  },
  {
    "id": "form-480-9ec-retencion-distributable-share-pass-through",
    "sourceKey": "Form 480.9EC — Retención Distributable Share Pass-Through",
    "title": "Form 480.9EC — Retención Distributable Share Pass-Through",
    "agency": "Hacienda PR",
    "appliesTo": [
      "Negocio"
    ],
    "frequency": "trimestral",
    "ruleType": "quarterly_specific_dates",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "15 abr / 15 jun / 15 sep / 15 dic",
    "notes": "Payment Voucher de retención sobre la participación distribuible de socios/accionistas de entidades conducto (pass-through entities). Cuatro pagos anuales: 15 abril (1er plazo), 15 junio (2do), 15 septiembre (3ro), 15 diciembre (4to). Radicación electrónica a través de SURI. Regla fin de semana aplica.",
    "requiresReview": false,
    "dates": [
      {
        "month": 4,
        "day": 15
      },
      {
        "month": 6,
        "day": 15
      },
      {
        "month": 9,
        "day": 15
      },
      {
        "month": 12,
        "day": 15
      }
    ]
  },
  {
    "id": "form-480-5-summary-of-informative-returns",
    "sourceKey": "Form 480.5 — Summary of Informative Returns",
    "title": "Form 480.5 — Summary of Informative Returns",
    "agency": "Hacienda PR",
    "appliesTo": [
      "Individuo",
      "Negocio",
      "Patronal"
    ],
    "frequency": "anual",
    "ruleType": "quarterly_specific_dates",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": false,
    "sourceStatus": "pending_review",
    "dueRuleText": "31 de enero / 3 de marzo | según tipo de informativa",
    "notes": "Resumen de todas las declaraciones informativas radicadas. Vence 31 de enero para las 480.7A y 480.7D. Vence 3 de marzo para las 480.6A, 480.6B, 480.6D, 480.6G, 480.6SP, 480.7, 480.7B, 480.7C, 480.7F, 480.7G. Vence 15 de abril para las 480.6C. Radicación electrónica a través de SURI. Regla fin de semana aplica.",
    "requiresReview": true,
    "dates": [
      {
        "month": 1,
        "day": 31
      },
      {
        "month": 3,
        "day": 3
      }
    ]
  },
  {
    "id": "form-480-7a-mortgage-interest-informative",
    "sourceKey": "Form 480.7A — Mortgage Interest Informative",
    "title": "Form 480.7A — Mortgage Interest Informative",
    "agency": "Hacienda PR",
    "appliesTo": [
      "Negocio"
    ],
    "frequency": "anual",
    "ruleType": "fixed_annual",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "31 de enero",
    "notes": "Declaración informativa de intereses hipotecarios pagados. Vence 31 de enero del año siguiente. Radicación electrónica a través de SURI. Regla fin de semana aplica.",
    "requiresReview": false,
    "month": 1,
    "day": 31
  },
  {
    "id": "form-480-7d-automobile-lease-payments",
    "sourceKey": "Form 480.7D — Automobile Lease Payments",
    "title": "Form 480.7D — Automobile Lease Payments",
    "agency": "Hacienda PR",
    "appliesTo": [
      "Negocio"
    ],
    "frequency": "anual",
    "ruleType": "fixed_annual",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "31 de enero",
    "notes": "Declaración informativa de pagos de arrendamiento de automóviles. Vence 31 de enero del año siguiente. Radicación electrónica a través de SURI. Regla fin de semana aplica.",
    "requiresReview": false,
    "month": 1,
    "day": 31
  },
  {
    "id": "form-sc-2788-b-gift-tax-return-donaciones",
    "sourceKey": "Form SC 2788 B — Gift Tax Return (Donaciones)",
    "title": "Form SC 2788 B — Gift Tax Return (Donaciones)",
    "agency": "Hacienda PR",
    "appliesTo": [
      "Individuo"
    ],
    "frequency": "anual",
    "ruleType": "fixed_annual",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "31 de enero | Prórroga 3 meses disponible",
    "notes": "Planilla informativa de donaciones de PR para el año contributivo anterior. La radica el donante. Vence 31 de enero (o 31 de marzo si se obtuvo prórroga de 3 meses). Para personas fuera de PR: prórroga de 6 meses disponible. Radicación electrónica a través de SURI. Regla fin de semana aplica.",
    "requiresReview": false,
    "month": 1,
    "day": 31
  },
  {
    "id": "form-480-6sp-2-annual-reconciliation-services-rendered",
    "sourceKey": "Form 480.6SP.2 — Annual Reconciliation Services Rendered",
    "title": "Form 480.6SP.2 — Annual Reconciliation Services Rendered",
    "agency": "Hacienda PR",
    "appliesTo": [
      "Negocio"
    ],
    "frequency": "anual",
    "ruleType": "fixed_annual",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "3 de marzo",
    "notes": "Estado de Reconciliación Anual de Servicios Rendidos. Resume todos los pagos por servicios del año calendario. Vence el 3 de marzo (primer día laborable de marzo si el 28 de feb cae en fin de semana según el año). Radicación electrónica a través de SURI. Regla fin de semana aplica.",
    "requiresReview": false,
    "month": 3,
    "day": 3
  },
  {
    "id": "form-480-7b-1-480-7c-1-reconciliation-ira-and-retirement-plans",
    "sourceKey": "Form 480.7B.1 / 480.7C.1 — Reconciliation IRA & Retirement Plans",
    "title": "Form 480.7B.1 / 480.7C.1 — Reconciliation IRA & Retirement Plans",
    "agency": "Hacienda PR",
    "appliesTo": [
      "Negocio"
    ],
    "frequency": "anual",
    "ruleType": "fixed_annual",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "3 de marzo",
    "notes": "480.7B.1: Reconciliación anual de retención de Cuentas de Contribución Educativa. 480.7C.1: Reconciliación anual de retención de Planes de Retiro y Anualidades. Ambas vencen el 3 de marzo. Radicación electrónica a través de SURI. Regla fin de semana aplica.",
    "requiresReview": false,
    "month": 3,
    "day": 3
  },
  {
    "id": "form-480-20-ec-pass-through-entity-income-tax-return",
    "sourceKey": "Form 480.20(EC) — Pass-Through Entity Income Tax Return",
    "title": "Form 480.20(EC) — Pass-Through Entity Income Tax Return",
    "agency": "Hacienda PR",
    "appliesTo": [
      "Negocio"
    ],
    "frequency": "anual",
    "ruleType": "fixed_annual",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "31 de marzo | Prórroga 6 meses",
    "notes": "Planilla Informativa de Contribución sobre Ingresos de Entidades Conducto (sociedades, sociedades especiales, corporaciones de individuos) con cierre al 31 de diciembre. Vence el último día del 3er mes tras el cierre — 31 de marzo para año natural. Prórroga automática de 6 meses disponible (hasta 30 septiembre). Radicación electrónica. Regla fin de semana aplica.",
    "requiresReview": false,
    "month": 3,
    "day": 31
  },
  {
    "id": "form-482-0-c-composite-return",
    "sourceKey": "Form 482.0(C) — Composite Return",
    "title": "Form 482.0(C) — Composite Return",
    "agency": "Hacienda PR",
    "appliesTo": [
      "Individuo"
    ],
    "frequency": "anual",
    "ruleType": "fixed_annual",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "15 de abril | Prórroga 6 meses",
    "notes": "Planilla Compuesta para socios individuales y miembros de sociedades y compañías de responsabilidad limitada. Vence 15 de abril. Prórroga automática de 6 meses disponible. Radicación electrónica. Si cae fin de semana o feriado → próximo día laborable.",
    "requiresReview": false,
    "month": 4,
    "day": 15
  },
  {
    "id": "form-480-80-fiduciary-income-tax-return",
    "sourceKey": "Form 480.80 — Fiduciary Income Tax Return",
    "title": "Form 480.80 — Fiduciary Income Tax Return",
    "agency": "Hacienda PR",
    "appliesTo": [
      "Individuo"
    ],
    "frequency": "anual",
    "ruleType": "fixed_annual",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "15 de abril | Prórroga 6 meses",
    "notes": "Planilla de Contribución sobre Ingresos de Fideicomisos y Sucesiones (estates and trusts) con cierre al 31 de diciembre. Vence 15 de abril. Prórroga automática de 6 meses disponible (hasta 15 octubre). Radicación electrónica. Si cae fin de semana o feriado → próximo día laborable.",
    "requiresReview": false,
    "month": 4,
    "day": 15
  },
  {
    "id": "fincen-form-114-fbar-foreign-bank-account-report",
    "sourceKey": "FinCEN Form 114 — FBAR Foreign Bank Account Report",
    "title": "FinCEN Form 114 — FBAR Foreign Bank Account Report",
    "agency": "FinCEN",
    "appliesTo": [
      "Individuo"
    ],
    "frequency": "anual",
    "ruleType": "fixed_annual",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "15 de abril | Prórroga automática 6 meses",
    "notes": "Reporte de cuentas bancarias extranjeras para contribuyentes con cuentas fuera de EE.UU. con valor agregado mayor de $10,000 en cualquier momento del año. Vence 15 de abril con prórroga automática hasta 15 de octubre. Radicación electrónica obligatoria. Si cae fin de semana o feriado federal → próximo día laborable.",
    "requiresReview": false,
    "month": 4,
    "day": 15
  },
  {
    "id": "form-480-30-ii-exempt-businesses-income-tax-return",
    "sourceKey": "Form 480.30(II) — Exempt Businesses Income Tax Return",
    "title": "Form 480.30(II) — Exempt Businesses Income Tax Return",
    "agency": "Hacienda PR",
    "appliesTo": [
      "Negocio"
    ],
    "frequency": "anual",
    "ruleType": "fixed_annual",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "15 de junio | Prórroga 6 meses",
    "notes": "Planilla de Contribución sobre Ingresos de Negocios Exentos (corporaciones con decretos de incentivos, año natural). Vence el 15 de junio. Prórroga automática de 6 meses disponible (hasta 15 de diciembre). Radicación electrónica. Si cae fin de semana o feriado → próximo día laborable.",
    "requiresReview": false,
    "month": 6,
    "day": 15
  },
  {
    "id": "form-480-7-oe-informative-return-exempt-organizations",
    "sourceKey": "Form 480.7(OE) — Informative Return Exempt Organizations",
    "title": "Form 480.7(OE) — Informative Return Exempt Organizations",
    "agency": "Hacienda PR",
    "appliesTo": [
      "Negocio"
    ],
    "frequency": "anual",
    "ruleType": "fixed_annual",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "15 de junio | Prórroga 6 meses",
    "notes": "Planilla Informativa de Organizaciones Exentas de Contribución sobre Ingresos (nonprofits bajo sección 1101.01) con cierre al 31 de diciembre. Vence 15 de junio. Prórroga de 6 meses disponible (hasta 15 de diciembre). Radicación electrónica a través de SURI. Regla fin de semana aplica.",
    "requiresReview": false,
    "month": 6,
    "day": 15
  },
  {
    "id": "form-480-60-f-480-80-f-revocable-grantor-trust",
    "sourceKey": "Form 480.60(F) / 480.80(F) — Revocable/Grantor Trust",
    "title": "Form 480.60(F) / 480.80(F) — Revocable/Grantor Trust",
    "agency": "Hacienda PR",
    "appliesTo": [
      "Negocio"
    ],
    "frequency": "anual",
    "ruleType": "fixed_annual",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "16 de marzo | Prórroga 6 meses → 15 sep",
    "notes": "480.60(F): Planilla Informativa del Fideicomiso Revocable o Grantor Trust — Participación Distribuible. 480.80(F): Planilla de Contribución sobre Ingresos del Fideicomiso Revocable o Grantor Trust. Ambas vencen el 16 de marzo para año natural (día 15 del 3er mes; si cae fin de semana → próximo día laborable). Prórroga de 6 meses disponible. Radicación electrónica a través de SURI.",
    "requiresReview": false,
    "month": 3,
    "day": 16
  },
  {
    "id": "forms-480-7-480-7b-480-7c-ira-educational-and-retirement",
    "sourceKey": "Forms 480.7 / 480.7B / 480.7C — IRA, Educational & Retirement",
    "title": "Forms 480.7 / 480.7B / 480.7C — IRA, Educational & Retirement",
    "agency": "Hacienda PR",
    "appliesTo": [
      "Negocio"
    ],
    "frequency": "anual",
    "ruleType": "quarterly_specific_dates",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": false,
    "sourceStatus": "pending_review",
    "dueRuleText": "3 de marzo (distribuciones) | 20 de noviembre (contribuciones)",
    "notes": "Dos obligaciones distintas por tipo: (1) Si reporta distribuciones: vence 3 de marzo junto con el Form 480.5. (2) Si reporta contribuciones u otras transacciones (no distribuciones): vence el 20 de noviembre. 480.7 = IRA individual. 480.7B = Cuenta de Contribución Educativa. 480.7C = Planes de Retiro y Anualidades. Radicación electrónica a través de SURI.",
    "requiresReview": true,
    "dates": [
      {
        "month": 3,
        "day": 3
      },
      {
        "month": 11,
        "day": 20
      }
    ]
  },
  {
    "id": "ivu-impuesto-sobre-ventas-y-uso",
    "sourceKey": "IVU — Impuesto sobre Ventas y Uso",
    "title": "IVU — Impuesto sobre Ventas y Uso",
    "agency": "Hacienda PR",
    "appliesTo": [
      "Individuo",
      "Negocio",
      "Patronal"
    ],
    "frequency": "mensual",
    "ruleType": "fixed_day_monthly",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "Día 20 | de cada mes",
    "notes": "Si el día 20 cae en fin de semana o feriado → próximo día laborable. Radicación y pago únicamente electrónico a través de SURI. Penalidad por mora: recargo automático.⚠️ Solo radicación electrónica — SURI",
    "requiresReview": false,
    "day": 20
  },
  {
    "id": "room-tax-canon-por-ocupacion-de-habitacion",
    "sourceKey": "Room Tax — Canon por Ocupación de Habitación",
    "title": "Room Tax — Canon por Ocupación de Habitación",
    "agency": "CTPR",
    "appliesTo": [
      "Negocio"
    ],
    "frequency": "mensual",
    "ruleType": "fixed_day_monthly",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "Día 10 | del mes siguiente",
    "notes": "Aplica a propiedades de alquiler a corto plazo (<90 días consecutivos). Tasa: 7% del canon cobrado. Pago a Compañía de Turismo (CTPR), no Hacienda. Penalidad: $500/día de infracción hasta $25,000.⚠️ Entidad receptora: CTPR, no Hacienda",
    "requiresReview": false,
    "day": 10
  },
  {
    "id": "499-r-1-deposito-mensual-income-tax-retenido",
    "sourceKey": "499 R-1 — Depósito Mensual Income Tax Retenido",
    "title": "499 R-1 — Depósito Mensual Income Tax Retenido",
    "agency": "Hacienda PR",
    "appliesTo": [
      "Patronal"
    ],
    "frequency": "mensual",
    "ruleType": "fixed_day_monthly",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": false,
    "sourceStatus": "pending_review",
    "dueRuleText": "Día 15 | del mes siguiente",
    "notes": "Depósito mensual de la contribución sobre ingresos retenida de salarios ante Hacienda PR (diferente al depósito federal al IRS). Depositantes mensuales: día 15 del mes siguiente. Depositantes bisemanales (retención >$50,000 en lookback period jul–jun): miércoles o viernes según cuándo se pagó el payroll. Si la obligación del trimestre es menor de $2,500, no se requiere depósito mensual. Regla fin de semana aplica.",
    "requiresReview": true,
    "day": 15
  },
  {
    "id": "deposito-federal-income-tax-and-fica",
    "sourceKey": "Depósito Federal — Income Tax & FICA",
    "title": "Depósito Federal — Income Tax & FICA",
    "agency": "IRS/Federal",
    "appliesTo": [
      "Patronal"
    ],
    "frequency": "mensual___bisemanal",
    "ruleType": "manual_review",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": false,
    "sourceStatus": "pending_review",
    "dueRuleText": "Día 15 | del mes siguiente (mensual)",
    "notes": "Depósito federal de FICA (SS + Medicare) e income tax federal retenido. Depositantes mensuales (<$50,000 en lookback): día 15 del mes siguiente. Depositantes bisemanales (>$50,000): miércoles o viernes. Depósito de un día siguiente: si acumula $100,000+ en un día. Obligatorio via EFTPS electrónico. Regla fin de semana aplica.",
    "requiresReview": true
  },
  {
    "id": "480-9a-deposito-retencion-sobre-servicios-profesionales",
    "sourceKey": "480.9A — Depósito Retención sobre Servicios Profesionales",
    "title": "480.9A — Depósito Retención sobre Servicios Profesionales",
    "agency": "Hacienda PR",
    "appliesTo": [
      "Patronal"
    ],
    "frequency": "mensual",
    "ruleType": "fixed_day_monthly",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "Día 15 | del mes siguiente",
    "notes": "Depósito mensual del 10% retenido sobre pagos por servicios profesionales designados a residentes de PR. Vence el día 15 del mes siguiente al mes en que se hizo la retención. Primer $1,500 pagado al año por proveedor está exento. Si el proveedor tiene certificado de exención (total o parcial), aplica la tasa reducida o cero. Regla fin de semana aplica.",
    "requiresReview": false,
    "day": 15
  },
  {
    "id": "deposito-retencion-corporacion-afiliada-no-residente",
    "sourceKey": "Depósito Retención — Corporación Afiliada No Residente",
    "title": "Depósito Retención — Corporación Afiliada No Residente",
    "agency": "Hacienda PR",
    "appliesTo": [
      "Negocio"
    ],
    "frequency": "por_transacción",
    "ruleType": "manual_review",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "Día 15 | del mes siguiente a la transacción",
    "notes": "Retención sobre pagos a corporaciones afiliadas no residentes (29% para corporaciones extranjeras no registradas; 20% para ciudadanos americanos no residentes). El depósito vence el día 15 del mes siguiente al mes en que se realizó la retención. Requiere radicación de informativa 480.6C al final del año. Regla fin de semana aplica.",
    "requiresReview": true
  },
  {
    "id": "499-r-1b-planilla-trimestral-patronal-de-contribucion-retenida",
    "sourceKey": "499 R-1B — Planilla Trimestral Patronal de Contribución Retenida",
    "title": "499 R-1B — Planilla Trimestral Patronal de Contribución Retenida",
    "agency": "Hacienda PR",
    "appliesTo": [
      "Patronal"
    ],
    "frequency": "trimestral",
    "ruleType": "fixed_quarterly",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "Último día | del mes siguiente al trimestre",
    "notes": "Q1→30 abr · Q2→31 jul · Q3→31 oct · Q4→31 ene. Radicación electrónica obligatoria a través de SURI. Diferente al Form 941 federal — este es ante Hacienda PR por la contribución estatal sobre ingresos retenida de salarios (Sección 1062.01 Código PR). Si la obligación del trimestre es menor de $2,500, no se requiere depósito mensual — se paga al radicar la planilla trimestral. Regla fin de semana aplica.",
    "requiresReview": false,
    "dates": [
      {
        "month": 4,
        "day": 30
      },
      {
        "month": 7,
        "day": 31
      },
      {
        "month": 10,
        "day": 31
      },
      {
        "month": 1,
        "day": 31
      }
    ]
  },
  {
    "id": "form-941-planilla-trimestral-del-patrono",
    "sourceKey": "Form 941 — Planilla Trimestral del Patrono",
    "title": "Form 941 — Planilla Trimestral del Patrono",
    "agency": "IRS/Federal",
    "appliesTo": [
      "Patronal"
    ],
    "frequency": "trimestral",
    "ruleType": "fixed_quarterly",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "Último día | del mes siguiente al trimestre",
    "notes": "Q1→30 abr · Q2→31 jul · Q3→31 oct · Q4→31 ene. Si la fecha cae en sábado, domingo o feriado legal federal → próximo día laborable. El feriado de referencia para propósitos federales es el del Distrito de Columbia. Reporta FICA (Social Security + Medicare) y federal income tax withheld.",
    "requiresReview": false,
    "dates": [
      {
        "month": 4,
        "day": 30
      },
      {
        "month": 7,
        "day": 31
      },
      {
        "month": 10,
        "day": 31
      },
      {
        "month": 1,
        "day": 31
      }
    ]
  },
  {
    "id": "480-6-sp-1-quarterly-return-tax-withheld-on-services",
    "sourceKey": "480.6 SP-1 — Quarterly Return Tax Withheld on Services",
    "title": "480.6 SP-1 — Quarterly Return Tax Withheld on Services",
    "agency": "Hacienda PR",
    "appliesTo": [
      "Patronal"
    ],
    "frequency": "trimestral",
    "ruleType": "fixed_quarterly",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "Último día | del mes siguiente al trimestre",
    "notes": "Q1→30 abr · Q2→31 jul · Q3→31 oct · Q4→31 ene. Reconciliación trimestral de retenciones del 10% sobre pagos por servicios profesionales designados. Radicación electrónica a través de SURI. El depósito mensual (480.9A) vence el día 15 del mes siguiente — esta planilla trimestral reconcilia esos depósitos. Regla fin de semana aplica.",
    "requiresReview": false,
    "dates": [
      {
        "month": 4,
        "day": 30
      },
      {
        "month": 7,
        "day": 31
      },
      {
        "month": 10,
        "day": 31
      },
      {
        "month": 1,
        "day": 31
      }
    ]
  },
  {
    "id": "disability-insurance-as-6",
    "sourceKey": "Disability Insurance — AS-6",
    "title": "Disability Insurance — AS-6",
    "agency": "DTRH / Hacienda",
    "appliesTo": [
      "Patronal"
    ],
    "frequency": "trimestral",
    "ruleType": "fixed_quarterly",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "Día 15 | del mes siguiente al trimestre",
    "notes": "Q1→15 abr · Q2→15 jul · Q3→15 oct · Q4→15 ene. Planilla trimestral de primas del seguro por incapacidad (non-occupational disability). Aplica a patronos con empleados en PR. Regla fin de semana aplica.",
    "requiresReview": false,
    "dates": [
      {
        "month": 4,
        "day": 15
      },
      {
        "month": 7,
        "day": 15
      },
      {
        "month": 10,
        "day": 15
      },
      {
        "month": 1,
        "day": 15
      }
    ]
  },
  {
    "id": "contribucion-estimada-individuos-pr",
    "sourceKey": "Contribución Estimada — Individuos PR",
    "title": "Contribución Estimada — Individuos PR",
    "agency": "Hacienda PR",
    "appliesTo": [
      "Individuo"
    ],
    "frequency": "trimestral",
    "ruleType": "quarterly_specific_dates",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "15 abr / 15 jun / 15 sep / 15 ene",
    "notes": "Cuatro pagos anuales para individuos: 15 de abril, 15 de junio, 15 de septiembre y 15 de enero del año siguiente. Si el 15 cae en fin de semana o feriado estatal o federal → próximo día laborable. Aplica cuando la obligación estimada supera cierto umbral. Forma 480.E-1.",
    "requiresReview": false,
    "dates": [
      {
        "month": 4,
        "day": 15
      },
      {
        "month": 6,
        "day": 15
      },
      {
        "month": 9,
        "day": 15
      },
      {
        "month": 1,
        "day": 15
      }
    ]
  },
  {
    "id": "contribucion-estimada-corporaciones-pr",
    "sourceKey": "Contribución Estimada — Corporaciones PR",
    "title": "Contribución Estimada — Corporaciones PR",
    "agency": "Hacienda PR",
    "appliesTo": [
      "Negocio"
    ],
    "frequency": "trimestral",
    "ruleType": "quarterly_specific_dates",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "15 abr / 15 jun / 15 sep / 15 dic",
    "notes": "⚠️ Diferente a individuos — el 4to pago de corporaciones vence el 15 de diciembre (no enero). Fechas: 15 abril, 15 junio, 15 septiembre, 15 diciembre. Si el 15 cae en fin de semana o feriado → próximo día laborable. Forma 480.E-1.",
    "requiresReview": false,
    "dates": [
      {
        "month": 4,
        "day": 15
      },
      {
        "month": 6,
        "day": 15
      },
      {
        "month": 9,
        "day": 15
      },
      {
        "month": 12,
        "day": 15
      }
    ]
  },
  {
    "id": "contribucion-estimada-federal-self-employed",
    "sourceKey": "Contribución Estimada Federal — Self-Employed",
    "title": "Contribución Estimada Federal — Self-Employed",
    "agency": "IRS/Federal",
    "appliesTo": [
      "Individuo"
    ],
    "frequency": "trimestral",
    "ruleType": "quarterly_specific_dates",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "15 abr / 15 jun / 15 sep / 15 ene",
    "notes": "Para trabajadores por cuenta propia con obligación federal estimada. Form 1040-ES (PR). Si la fecha cae en fin de semana o feriado federal o feriado de D.C. → próximo día laborable. Aplica cuando la obligación federal estimada excede $1,000.",
    "requiresReview": false,
    "dates": [
      {
        "month": 4,
        "day": 15
      },
      {
        "month": 6,
        "day": 15
      },
      {
        "month": 9,
        "day": 15
      },
      {
        "month": 1,
        "day": 15
      }
    ]
  },
  {
    "id": "deposito-futa-trimestral",
    "sourceKey": "Depósito FUTA — Trimestral",
    "title": "Depósito FUTA — Trimestral",
    "agency": "IRS/Federal",
    "appliesTo": [
      "Patronal"
    ],
    "frequency": "trimestral",
    "ruleType": "fixed_quarterly",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "Último día | del mes siguiente al trimestre",
    "notes": "Si la obligación FUTA acumulada durante el trimestre supera $500, debe depositarse al final del trimestre (30 abr, 31 jul, 31 oct, 31 ene). Si no supera $500 al cierre del año, se paga con el Form 940 en enero. Regla fin de semana aplica.",
    "requiresReview": false,
    "dates": [
      {
        "month": 4,
        "day": 30
      },
      {
        "month": 7,
        "day": 31
      },
      {
        "month": 10,
        "day": 31
      },
      {
        "month": 1,
        "day": 31
      }
    ]
  },
  {
    "id": "form-940-futa-anual",
    "sourceKey": "Form 940 — FUTA Anual",
    "title": "Form 940 — FUTA Anual",
    "agency": "IRS/Federal",
    "appliesTo": [
      "Patronal"
    ],
    "frequency": "anual",
    "ruleType": "fixed_annual",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "31 de enero",
    "notes": "Vence el 31 de enero del año siguiente. Si cae en fin de semana o feriado federal → próximo día laborable. Aplica a patronos que pagaron $1,500+ en salarios o tuvieron empleados 20+ semanas en el año.",
    "requiresReview": false,
    "month": 1,
    "day": 31
  },
  {
    "id": "form-943-empleados-agricolas",
    "sourceKey": "Form 943 — Empleados Agrícolas",
    "title": "Form 943 — Empleados Agrícolas",
    "agency": "IRS/Federal",
    "appliesTo": [
      "Patronal"
    ],
    "frequency": "anual",
    "ruleType": "fixed_annual",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "31 de enero",
    "notes": "Planilla anual de contribución federal de patronos de empleados agrícolas. Vence 31 de enero. Regla fin de semana aplica.",
    "requiresReview": false,
    "month": 1,
    "day": 31
  },
  {
    "id": "w-2-pr-499r-2-and-w-3-pr-comprobantes-de-retencion",
    "sourceKey": "W-2 PR (499R-2) & W-3 PR — Comprobantes de Retención",
    "title": "W-2 PR (499R-2) & W-3 PR — Comprobantes de Retención",
    "agency": "SSA + Hacienda",
    "appliesTo": [
      "Patronal"
    ],
    "frequency": "anual",
    "ruleType": "fixed_annual",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "31 de enero",
    "notes": "Los Form 499R-2/W-2PR con el Form W-3 (PR) deben someterse a la SSA a más tardar el 31 de enero. Copia al empleado también el 31 de enero. Si cae fin de semana → próximo día laborable. Radicación electrónica si se preparan 10 o más formularios.",
    "requiresReview": false,
    "month": 1,
    "day": 31
  },
  {
    "id": "499-r-3-annual-reconciliation-income-tax-withheld",
    "sourceKey": "499 R-3 — Annual Reconciliation Income Tax Withheld",
    "title": "499 R-3 — Annual Reconciliation Income Tax Withheld",
    "agency": "Hacienda PR",
    "appliesTo": [
      "Patronal"
    ],
    "frequency": "anual",
    "ruleType": "fixed_annual",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "31 de enero",
    "notes": "Estado de Reconciliación Anual de Contribución sobre Ingresos Retenida. Resume todos los depósitos y planillas trimestrales (499 R-1B) del año. Vence 31 de enero junto con los W-2PR. Radicación electrónica a través de SURI. Regla fin de semana aplica.",
    "requiresReview": false,
    "month": 1,
    "day": 31
  },
  {
    "id": "chauffeur-s-insurance-seguro-de-choferes",
    "sourceKey": "Chauffeur's Insurance — Seguro de Choferes",
    "title": "Chauffeur's Insurance — Seguro de Choferes",
    "agency": "Hacienda PR",
    "appliesTo": [
      "Patronal"
    ],
    "frequency": "anual",
    "ruleType": "fixed_annual",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "31 de enero",
    "notes": "Aplica a patronos que utilizan vehículos de motor en sus operaciones. Contribución sobre seguro de choferes. Vence 31 de enero. Regla fin de semana aplica.",
    "requiresReview": false,
    "month": 1,
    "day": 31
  },
  {
    "id": "declaraciones-informativas",
    "sourceKey": "Declaraciones Informativas",
    "title": "Declaraciones Informativas",
    "agency": "Hacienda PR",
    "appliesTo": [
      "Individuo",
      "Negocio",
      "Patronal"
    ],
    "frequency": "anual",
    "ruleType": "fixed_annual",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "28 de febrero",
    "notes": "Todas las personas que realicen pagos por rentas, compensaciones, intereses, dividendos o servicios deben rendir declaraciones informativas no más tarde del 28 de febrero. Si el 28 cae en fin de semana o feriado → próximo día laborable. Radicación electrónica a través de SURI. Incluye: 480.6A (no sujeto a retención), 480.6B (sujeto a retención), 480.6C (no residentes), 480.6SP (servicios), 480.7E (publicidad, seguros, telecom).",
    "requiresReview": false,
    "month": 2,
    "day": 28
  },
  {
    "id": "480-6b-1-annual-reconciliation-withholding-on-services",
    "sourceKey": "480.6B.1 — Annual Reconciliation Withholding on Services",
    "title": "480.6B.1 — Annual Reconciliation Withholding on Services",
    "agency": "Hacienda PR",
    "appliesTo": [
      "Patronal"
    ],
    "frequency": "anual",
    "ruleType": "fixed_annual",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "28 de febrero",
    "notes": "Estado de Reconciliación Anual de Retención sobre Pagos por Servicios Rendidos. Resume los pagos y retenciones del 10% del año calendario anterior. Vence el último día de febrero. Si cae en fin de semana o feriado → próximo día laborable. Radicación electrónica a través de SURI.",
    "requiresReview": false,
    "month": 2,
    "day": 28
  },
  {
    "id": "state-insurance-fund-cfse-2do-pago-semestral",
    "sourceKey": "State Insurance Fund (CFSE) — 2do Pago Semestral",
    "title": "State Insurance Fund (CFSE) — 2do Pago Semestral",
    "agency": "CFSE",
    "appliesTo": [
      "Patronal"
    ],
    "frequency": "semestral",
    "ruleType": "manual_review",
    "adjustmentRule": "review_notice_or_invoice",
    "sourceConfirmed": false,
    "sourceStatus": "pending_review",
    "dueRuleText": "Febrero | según factura CFSE",
    "notes": "Segundo pago semestral de primas del SIF correspondiente al período enero–junio. La fecha exacta la establece la CFSE en la factura enviada al patrono. El año de póliza es del 1 de julio al 30 de junio. Regla de fin de semana aplica al vencimiento indicado en la factura.",
    "requiresReview": true,
    "approximateMonth": 2
  },
  {
    "id": "planilla-pass-through-entity-entidad-conducto",
    "sourceKey": "Planilla Pass-Through Entity (Entidad Conducto)",
    "title": "Planilla Pass-Through Entity (Entidad Conducto)",
    "agency": "Hacienda PR",
    "appliesTo": [
      "Negocio"
    ],
    "frequency": "anual",
    "ruleType": "fixed_annual",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "15 de marzo",
    "notes": "Sociedades, LLC y otras entidades conducto (pass-through) con cierre de año natural deben radicar el 15 de marzo. Si cae fin de semana o feriado → próximo día laborable. Prórroga automática disponible mediante SC 2644.",
    "requiresReview": false,
    "month": 3,
    "day": 15
  },
  {
    "id": "planilla-de-individuos-hacienda-pr",
    "sourceKey": "Planilla de Individuos — Hacienda PR",
    "title": "Planilla de Individuos — Hacienda PR",
    "agency": "Hacienda PR",
    "appliesTo": [
      "Individuo"
    ],
    "frequency": "anual",
    "ruleType": "fixed_annual",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "15 de abril",
    "notes": "Todo individuo residente de PR debe radicar electrónicamente no más tarde del 15 de abril. Si el 15 cae en fin de semana o feriado estatal o federal → próximo día laborable. Prórroga automática de 6 meses disponible (Forma SC 2644) — extiende plazo de radicación, NO de pago.",
    "requiresReview": false,
    "month": 4,
    "day": 15
  },
  {
    "id": "planilla-de-corporacion-hacienda-pr",
    "sourceKey": "Planilla de Corporación — Hacienda PR",
    "title": "Planilla de Corporación — Hacienda PR",
    "agency": "Hacienda PR",
    "appliesTo": [
      "Negocio"
    ],
    "frequency": "anual",
    "ruleType": "fixed_annual",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "15 de abril",
    "notes": "Corporaciones con cierre al 31 de diciembre deben radicar el día 15 del cuarto mes siguiente (15 de abril). Si cae en fin de semana o feriado → próximo día laborable. Para cierres fiscales distintos: día 15 del cuarto mes tras el cierre. Prórroga automática disponible (SC 2644).",
    "requiresReview": false,
    "month": 4,
    "day": 15
  },
  {
    "id": "form-1040-ss-self-employment-tax-return-pr",
    "sourceKey": "Form 1040-SS — Self-Employment Tax Return PR",
    "title": "Form 1040-SS — Self-Employment Tax Return PR",
    "agency": "IRS/Federal",
    "appliesTo": [
      "Individuo"
    ],
    "frequency": "anual",
    "ruleType": "fixed_annual",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "15 de abril",
    "notes": "Para residentes bona fide de PR con ingresos por cuenta propia de $400+ que no estén obligados a radicar Form 1040 federal. Reporta y paga la contribución al Seguro Social y Medicare sobre ingresos de trabajo por cuenta propia. Vence 15 de abril. Prórroga de 6 meses (Form 4868). Si cae fin de semana o feriado federal → próximo día laborable. Nota: Form 1040-PR fue descontinuado desde el año contributivo 2023.",
    "requiresReview": false,
    "month": 4,
    "day": 15
  },
  {
    "id": "planilla-federal-individuo-irs-form-1040",
    "sourceKey": "Planilla Federal Individuo — IRS Form 1040",
    "title": "Planilla Federal Individuo — IRS Form 1040",
    "agency": "IRS/Federal",
    "appliesTo": [
      "Individuo"
    ],
    "frequency": "anual",
    "ruleType": "fixed_annual",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "15 de abril",
    "notes": "Residentes bona fide de PR que tengan ingreso de fuentes fuera de PR o ingresos federales sujetos deben radicar Form 1040. Vence 15 de abril. Si cae en fin de semana o feriado federal o feriado de D.C. (Emancipation Day) → próximo día laborable. Prórroga de 6 meses disponible (Form 4868).",
    "requiresReview": false,
    "month": 4,
    "day": 15
  },
  {
    "id": "480-30-annual-return-withholding-non-residents",
    "sourceKey": "480.30 — Annual Return Withholding Non-Residents",
    "title": "480.30 — Annual Return Withholding Non-Residents",
    "agency": "Hacienda PR",
    "appliesTo": [
      "Negocio"
    ],
    "frequency": "anual",
    "ruleType": "fixed_annual",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "15 de abril",
    "notes": "Planilla anual de reconciliación de retención sobre ingresos a no residentes y corporaciones afiliadas no residentes. Vence el 15 de abril del año siguiente. Consolida todos los depósitos mensuales de retenciones sobre pagos a no residentes realizados durante el año. Si cae fin de semana o feriado → próximo día laborable.",
    "requiresReview": false,
    "month": 4,
    "day": 15
  },
  {
    "id": "patente-municipal-declaracion-de-volumen-de-negocios",
    "sourceKey": "Patente Municipal — Declaración de Volumen de Negocios",
    "title": "Patente Municipal — Declaración de Volumen de Negocios",
    "agency": "Municipios",
    "appliesTo": [
      "Negocio"
    ],
    "frequency": "anual",
    "ruleType": "relative_to_date",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": false,
    "sourceStatus": "pending_review",
    "dueRuleText": "5 días laborables | después del 15 de abril",
    "notes": "La declaración de volumen de negocios con derecho al descuento del 5% vence el 22 de abril (5 días laborables tras el 15 de abril para 2026). La fecha exacta varía año a año según interpretación municipal. Prórroga hasta 6 meses a discreción del municipio (requiere notarización). Pago semestral: primeros 15 días de julio y 15 de enero sin descuento si no pagó en la declaración.",
    "requiresReview": true,
    "baseMonth": 4,
    "baseDay": 15,
    "businessDaysAfter": 5
  },
  {
    "id": "informe-anual-de-corporacion-llc-annual-report",
    "sourceKey": "Informe Anual de Corporación / LLC Annual Report",
    "title": "Informe Anual de Corporación / LLC Annual Report",
    "agency": "Dpto. de Estado PR",
    "appliesTo": [
      "Negocio"
    ],
    "frequency": "anual",
    "ruleType": "fixed_annual",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "15 de abril",
    "notes": "Corporaciones y LLCs deben radicar su informe anual ante el Departamento de Estado de PR. Coincide con la fecha de planilla de ingresos. Regla fin de semana aplica. Penalidad por no radicar: $500 + posible disolución involuntaria. Radicación electrónica. Costo: $150.",
    "requiresReview": false,
    "month": 4,
    "day": 15
  },
  {
    "id": "planilla-propiedad-mueble-crim",
    "sourceKey": "Planilla Propiedad Mueble (CRIM)",
    "title": "Planilla Propiedad Mueble (CRIM)",
    "agency": "CRIM",
    "appliesTo": [
      "Negocio"
    ],
    "frequency": "anual",
    "ruleType": "fixed_annual",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "15 de mayo",
    "notes": "La planilla de contribución sobre propiedad mueble debe rendirse al CRIM en o antes del 15 de mayo. Prórroga automática de 3 meses disponible. Descuento del 5% si se cumple con pagos estimados del año corriente. Si el 15 cae en fin de semana o feriado → próximo día laborable.",
    "requiresReview": false,
    "month": 5,
    "day": 15
  },
  {
    "id": "informe-anual-de-negocios-exentos",
    "sourceKey": "Informe Anual de Negocios Exentos",
    "title": "Informe Anual de Negocios Exentos",
    "agency": "Hacienda PR",
    "appliesTo": [
      "Negocio"
    ],
    "frequency": "anual",
    "ruleType": "relative_to_date",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": false,
    "sourceStatus": "pending_review",
    "dueRuleText": "15 de junio | + 5 días laborables",
    "notes": "Para empresas bajo decretos del Código de Incentivos (Act 60, Act 14, leyes anteriores). Vence 5 días laborables después del 15 de junio de cada año fiscal. Prórroga automática ampliada a 8 meses. Antes se radicaba ante el DDEC; desde 2025 se radica ante Hacienda como parte de la Planilla PR.",
    "requiresReview": true,
    "baseMonth": 6,
    "baseDay": 15,
    "businessDaysAfter": 5
  },
  {
    "id": "planilla-exempt-corporation-org-exenta",
    "sourceKey": "Planilla Exempt Corporation / Org. Exenta",
    "title": "Planilla Exempt Corporation / Org. Exenta",
    "agency": "Hacienda PR",
    "appliesTo": [
      "Negocio"
    ],
    "frequency": "anual",
    "ruleType": "fixed_annual",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "15 de junio",
    "notes": "Organizaciones exentas de contribución sobre ingresos (nonprofits, sec. 1101.01) con cierre fiscal en diciembre. Vence el 15 del sexto mes tras el cierre. Para año natural: 15 de junio. Regla fin de semana aplica.",
    "requiresReview": false,
    "month": 6,
    "day": 15
  },
  {
    "id": "state-insurance-fund-cfse-declaracion-de-nomina",
    "sourceKey": "State Insurance Fund (CFSE) — Declaración de Nómina",
    "title": "State Insurance Fund (CFSE) — Declaración de Nómina",
    "agency": "CFSE",
    "appliesTo": [
      "Patronal"
    ],
    "frequency": "anual",
    "ruleType": "date_window",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": false,
    "sourceStatus": "pending_review",
    "dueRuleText": "1 jul – 15 ago | Prórroga hasta 30 ago",
    "notes": "Todo patrono con póliza permanente debe radicar su Declaración de Nómina correspondiente al período julio–junio. Ventana de radicación: 1 de julio al 15 de agosto. Prórroga disponible hasta el 30 de agosto. El incumplimiento deja al patrono sin cobertura, con responsabilidad personal por accidentes laborales.",
    "requiresReview": true,
    "startMonth": 7,
    "startDay": 1,
    "endMonth": 8,
    "endDay": 15
  },
  {
    "id": "real-property-tax-crim-inmueble-1er-semestre",
    "sourceKey": "Real Property Tax (CRIM — Inmueble) — 1er Semestre",
    "title": "Real Property Tax (CRIM — Inmueble) — 1er Semestre",
    "agency": "CRIM",
    "appliesTo": [
      "Individuo",
      "Negocio",
      "Patronal"
    ],
    "frequency": "semestral",
    "ruleType": "manual_review",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": false,
    "sourceStatus": "pending_review",
    "dueRuleText": "1ro de julio",
    "notes": "Pagadero semestralmente por adelantado el 1ro de julio y el 1ro de enero. Descuentos: 10% si paga dentro de 30 días desde la factura; 5% dentro de 60 días. Recargo del 5% si paga entre 30–60 días tarde; 10% si pasa de 60 días. La contribución se torna morosa a los 90 días. Si el 1ro cae en fin de semana o feriado → próximo día laborable.",
    "requiresReview": true
  },
  {
    "id": "municipal-tax-license-1er-semestre",
    "sourceKey": "Municipal Tax License — 1er Semestre",
    "title": "Municipal Tax License — 1er Semestre",
    "agency": "Municipios",
    "appliesTo": [
      "Negocio"
    ],
    "frequency": "semestral",
    "ruleType": "date_window",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": false,
    "sourceStatus": "pending_review",
    "dueRuleText": "Primeros 15 días | de julio",
    "notes": "El pago semestral de patente municipal del primer semestre (julio–diciembre) vence dentro de los primeros 15 días de julio. El segundo semestre (enero–junio) vence dentro de los primeros 15 días de enero. Regla fin de semana aplica.",
    "requiresReview": true,
    "startMonth": 7,
    "startDay": 1,
    "endMonth": 7,
    "endDay": 15
  },
  {
    "id": "boi-beneficial-ownership-information",
    "sourceKey": "BOI — Beneficial Ownership Information",
    "title": "BOI — Beneficial Ownership Information",
    "agency": "FinCEN",
    "appliesTo": [
      "Negocio"
    ],
    "frequency": "una_sola_vez",
    "ruleType": "variable",
    "adjustmentRule": "review_registration_date",
    "sourceConfirmed": false,
    "sourceStatus": "pending_review",
    "dueRuleText": "30 días calendario | tras registro efectivo",
    "notes": "⚠️ CAMBIO CRÍTICO 2025: Desde el 26 de marzo de 2025, todas las entidades domésticas creadas en Puerto Rico o cualquier estado de EE.UU. están EXENTAS del requisito BOI ante FinCEN. Solo aplica a entidades extranjeras registradas en EE.UU. Si tu entidad es doméstica de PR → no tienes obligación BOI. Entidades extranjeras nuevas: 30 días calendario tras registro efectivo.",
    "requiresReview": true
  },
  {
    "id": "christmas-bonus-bono-de-navidad",
    "sourceKey": "Christmas Bonus — Bono de Navidad",
    "title": "Christmas Bonus — Bono de Navidad",
    "agency": "DTRH",
    "appliesTo": [
      "Patronal"
    ],
    "frequency": "anual",
    "ruleType": "date_window",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": true,
    "sourceStatus": "confirmed",
    "dueRuleText": "15 nov – 15 dic",
    "notes": "Patronos de empresa privada deben pagar el bono entre el 15 de noviembre y el 15 de diciembre. Monto: 6% del salario (hasta $600) para patronos con más de 15 empleados; 3% (hasta $300) para 15 o menos. Para exención por pérdidas: solicitud al DTRH a más tardar el 1ro de diciembre. Penalidad por pago tardío: 50% adicional dentro de 6 meses; 100% adicional después de 6 meses.",
    "requiresReview": false,
    "startMonth": 11,
    "startDay": 15,
    "endMonth": 12,
    "endDay": 15
  },
  {
    "id": "exempt-corporation-individual-annual-report",
    "sourceKey": "Exempt Corporation / Individual Annual Report",
    "title": "Exempt Corporation / Individual Annual Report",
    "agency": "Hacienda PR",
    "appliesTo": [
      "Individuo",
      "Negocio",
      "Patronal"
    ],
    "frequency": "anual",
    "ruleType": "manual_review",
    "adjustmentRule": "review_notice_or_invoice",
    "sourceConfirmed": false,
    "sourceStatus": "pending_review",
    "dueRuleText": "Nov / Dic | según notificación",
    "notes": "Informe anual para personas o entidades que cualifican bajo exenciones contributivas específicas. La fecha varía según el tipo de exención. Verificar notificación de Hacienda PR. Regla fin de semana aplica.",
    "requiresReview": true,
    "approximateMonth": 11
  },
  {
    "id": "real-property-tax-2do-semestre",
    "sourceKey": "Real Property Tax — 2do Semestre",
    "title": "Real Property Tax — 2do Semestre",
    "agency": "CRIM",
    "appliesTo": [
      "Individuo",
      "Negocio",
      "Patronal"
    ],
    "frequency": "semestral",
    "ruleType": "manual_review",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": false,
    "sourceStatus": "pending_review",
    "dueRuleText": "1ro de enero",
    "notes": "Segundo semestre de la contribución sobre propiedad inmueble. Pagadero por adelantado el 1ro de enero. Mismas reglas de descuentos: 10% dentro de 30 días de la factura; 5% dentro de 60 días. Morosa a los 90 días. Regla fin de semana aplica.",
    "requiresReview": true
  },
  {
    "id": "estimated-property-tax-propiedad-mueble-estimada",
    "sourceKey": "Estimated Property Tax — Propiedad Mueble Estimada",
    "title": "Estimated Property Tax — Propiedad Mueble Estimada",
    "agency": "CRIM",
    "appliesTo": [
      "Negocio"
    ],
    "frequency": "trimestral",
    "ruleType": "quarterly_specific_dates",
    "adjustmentRule": "next_business_day_if_weekend",
    "sourceConfirmed": false,
    "sourceStatus": "pending_review",
    "dueRuleText": "15 nov / 15 feb / 15 may | según cuándo llega la notificación",
    "notes": "Los pagos estimados de propiedad mueble siguen un calendario de 2–3 plazos según cuándo se recibe la notificación del CRIM: Si llega jul–oct → 3 plazos (15 nov, 15 feb, 15 may). Si llega nov–ene → 2 plazos (15 feb, 15 may). Si llega ene–15 may → 1 pago (15 may). Descuento del 5% en planilla anual si se cumplen los estimados. Regla fin de semana aplica a cada fecha.",
    "requiresReview": true,
    "dates": [
      {
        "month": 11,
        "day": 15
      },
      {
        "month": 2,
        "day": 15
      },
      {
        "month": 5,
        "day": 15
      }
    ]
  }
];

  function validateCalendarRulesCompleteness(sourceChecklist, rules){
    const sourceCounts = sourceChecklist.reduce(function(map, item){ map[item] = (map[item] || 0) + 1; return map; }, {});
    const loadedCounts = rules.reduce(function(map, rule){ map[rule.sourceKey] = (map[rule.sourceKey] || 0) + 1; return map; }, {});
    const missing = sourceChecklist.filter(function(item){ return !loadedCounts[item]; });
    const duplicates = Object.keys(loadedCounts).filter(function(item){ return loadedCounts[item] > (sourceCounts[item] || 0); });
    const withoutRuleType = rules.filter(function(rule){ return !rule.ruleType; }).map(function(rule){ return rule.sourceKey || rule.id; });
    const withoutAgency = rules.filter(function(rule){ return !rule.agency; }).map(function(rule){ return rule.sourceKey || rule.id; });
    const withoutFrequency = rules.filter(function(rule){ return !rule.frequency; }).map(function(rule){ return rule.sourceKey || rule.id; });
    const withoutDueRuleText = rules.filter(function(rule){ return !rule.dueRuleText; }).map(function(rule){ return rule.sourceKey || rule.id; });
    const requiresReview = rules.filter(function(rule){ return rule.requiresReview; });
    const confirmedSources = rules.filter(function(rule){ return rule.sourceStatus === 'confirmed'; });
    const pendingSources = rules.filter(function(rule){ return rule.sourceStatus !== 'confirmed'; });
    return {
      sourceCount: sourceChecklist.length,
      loadedCount: rules.length,
      missingCount: missing.length,
      duplicateCount: duplicates.length,
      requiresReviewCount: requiresReview.length,
      confirmedSourceCount: confirmedSources.length,
      pendingSourceCount: pendingSources.length,
      missing: missing,
      duplicates: duplicates,
      withoutRuleType: withoutRuleType,
      withoutAgency: withoutAgency,
      withoutFrequency: withoutFrequency,
      withoutDueRuleText: withoutDueRuleText,
    };
  }

  window.SL_TAX_CALENDAR_PR = {
    sourceObligationChecklist: sourceObligationChecklist,
    taxCalendarRules: taxCalendarRules,
    validateCalendarRulesCompleteness: validateCalendarRulesCompleteness,
  };
})();
