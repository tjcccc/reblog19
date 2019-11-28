module.exports = {
  apps : [{
    name: 'reblog19-client',
    script: 'npx',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'serve -s build -p 3000',
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
  }],
  deploy : {
    production : {
      user : 'node',
      host : '127.0.0.1',
      ref  : 'origin/master',
      repo : 'tjcccc@github.com:reblog19.git',
      path : '/var/www/production',
      'post-deploy' : 'yarn && pm2 reload ecosystem.config.js --env production'
    }
  }
};
