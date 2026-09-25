import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function githubPagesBase() {
  const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env
  if (env?.GITHUB_PAGES !== 'true') return '/'
  const repo = env.GITHUB_REPOSITORY?.split('/')[1]
  return repo ? `/${repo}/` : '/'
}

export default defineConfig({
  base: githubPagesBase(),
  plugins: [react()],
})
