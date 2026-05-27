import { defineConfig } from 'checkly'

const config = defineConfig({
  projectName: 'La Petite Enfance Soleil',
  logicalId: 'la-petite-enfance-soleil',
  checks: {
    frequency: 10,
    locations: ['eu-central-1', 'eu-west-1'],
    runtimeId: '2025.04',
    checkMatch: '**/__checks__/**/*.check.ts',
    playwrightConfig: {
      timeout: 30000,
      use: {
        baseURL: 'https://lgc-jeunesse.lagrandeclasse.fr',
        viewport: { width: 1280, height: 720 },
      },
    },
    browserChecks: {
      testMatch: '**/__checks__/**/*.spec.ts',
    },
  },
  cli: {
    runLocation: 'eu-central-1',
    reporters: ['list'],
    retries: 1,
  },
})

export default config
