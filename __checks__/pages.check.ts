import { ApiCheck, AssertionBuilder } from 'checkly/constructs'

const BASE = 'https://lgc-jeunesse.lagrandeclasse.fr'

const pages = [
  { id: 'pedagogie',              path: '/pedagogie' },
  { id: 'formation',              path: '/formation' },
  { id: 'pratiques-pro',          path: '/pratiques-professionnelles' },
  { id: 'reglementation',         path: '/reglementation' },
  { id: 'aide-finance',           path: '/aide_finance' },
]

for (const { id, path } of pages) {
  new ApiCheck(`page-${id}-check`, {
    name: `Page ${path} - HTTP 200`,
    activated: true,
    request: {
      method: 'GET',
      url: `${BASE}${path}`,
      assertions: [
        AssertionBuilder.statusCode().equals(200),
        AssertionBuilder.responseTime().lessThan(4000),
      ],
    },
  })
}
