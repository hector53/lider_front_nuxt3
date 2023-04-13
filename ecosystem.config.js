module.exports = {
    apps: [
      {
        name: 'NuxtLider',
        port: 3001,
        exec_mode: 'cluster',
        instances: '2',
        script: './.output/server/index.mjs',
        args: 'preview',
        interpreter: 'esm',
        exec_interpreter: 'node',
      },
    ],
  }