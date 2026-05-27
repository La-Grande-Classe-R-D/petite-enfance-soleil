import { ApiCheck, AssertionBuilder } from 'checkly/constructs'

new ApiCheck('homepage-check', {
  name: 'Page d\'accueil - HTTP 200',
  activated: true,
  request: {
    method: 'GET',
    url: 'https://lgc-jeunesse.lagrandeclasse.fr',
    assertions: [
      AssertionBuilder.statusCode().equals(200),
      AssertionBuilder.responseTime().lessThan(3000),
    ],
  },
})
