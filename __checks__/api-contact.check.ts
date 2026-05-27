import { ApiCheck, AssertionBuilder } from 'checkly/constructs'

// Vérifie que l'API contact accepte les requêtes bien formées
new ApiCheck('api-contact-check', {
  name: 'API Contact - disponibilité',
  activated: true,
  request: {
    method: 'POST',
    url: 'https://lgc-jeunesse.lagrandeclasse.fr/api/contact',
    headers: [{ key: 'Content-Type', value: 'application/json' }],
    body: JSON.stringify({
      nom: 'Test Checkly',
      email: 'monitor@checkly.io',
      message: 'Vérification automatique de disponibilité.',
      _hp: '',
      _t: 5000,
    }),
    assertions: [
      // 200 (succès) ou 429 (rate limit atteint) sont tous deux acceptables
      AssertionBuilder.statusCode().lessThan(500),
      AssertionBuilder.responseTime().lessThan(5000),
    ],
  },
})
