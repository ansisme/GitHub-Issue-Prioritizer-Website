namespace NodeJS {
    interface ProcessEnv extends NodeJS.ProcessEnv {
      GITHUB_ID: string
      GITHUB_SECRET: string

      SECRET: string
    }
  }