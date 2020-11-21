/* eslint-disable no-undef */
module.exports = {
  apps : [
    {
      name: 'reblog19-server',
      cwd: 'server/',
      script: './app.js',
      args: 'one two',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'reblog19-client',
      script: 'yarn',
      args: 'run serve',
      //interpreter: '/bin/bash',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    },
  ],
  deploy : {
    production : {
      user : 'node',
      host : '127.0.0.1',
      ref  : 'origin/master',
      repo : 'tjcccc@github.com:reblog19.git',
      path : '/var/www/production',
      'post-deploy' : 'pm2 reload ecosystem.config.js --env production'
    }
  }
};


