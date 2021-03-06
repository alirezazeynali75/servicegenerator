#!/usr/bin/env node
function generatePackageJson (projectName) {
    return `
{
  "name": "${projectName}",
  "version": "1.0.0",
  "description": "Payment processing system for Phinix blockchain",
  "main": "index.js",
  "author": "Phinix blockchain dept. <alirezazeynali75@gmail.com>",
  "license": "MIT",
  "scripts": {
    "start": "node index.js",
    "test": "jest",
    "build": "npx prettier --write .; gulp",
    "migrate": "npx sequelize-cli db:migrate",
    "migrate::redo": "npx sequelize-cli db:migrate:undo; npx sequelize-cli db:migrate",
    "migrate::undo": "npx sequelize-cli db:migrate:undo",
    "seeders": "npx sequelize-cli db:seed:all"
  },
  "keywords": [
    "Blockchain",
    "Wallex",
    "Phinix"
  ],
  "devDependencies": {
    "@tsconfig/node12": "^1.0.7",
    "@types/bluebird": "^3.5.30",
    "@types/jest": "^25.2.1",
    "@types/node": "^13.13.1",
    "@types/validator": "^13.0.0",
    "@typescript-eslint/eslint-plugin": "^2.33.0",
    "@typescript-eslint/parser": "^2.33.0",
    "eslint": "^7.6.0",
    "eslint-config-prettier": "^6.11.0",
    "eslint-config-standard": "^14.1.1",
    "eslint-plugin-import": "^2.20.2",
    "eslint-plugin-node": "^11.1.0",
    "eslint-plugin-promise": "^4.2.1",
    "eslint-plugin-standard": "^4.0.1",
    "gulp": "^4.0.2",
    "gulp-eslint": "^6.0.0",
    "gulp-git": "^2.10.1",
    "gulp-if": "^3.0.0",
    "gulp-prettier": "^3.0.0",
    "gulp-typescript": "^6.0.0-alpha.1",
    "jest": "^26.1.0",
    "prettier": "2.0.5"
  },
  "dependencies": {
    "amqplib": "^0.6.0",
    "axios": "^0.19.2",
    "dotenv": "^8.2.0",
    "lodash": "^4.17.20",
    "moment": "^2.27.0",
    "mysql2": "^2.1.0",
    "node-cron": "^2.0.3",
    "sequelize": "^5.21.6",
    "sequelize-cli": "^5.5.1",
    "socket.io": "^2.3.0",
    "socket.io-client": "^2.3.0",
    "typescript": "^3.9.7",
    "winston": "^3.2.1",
    "winston-daily-rotate-file": "^4.4.2"
  }
}`
}
const prettierignore = `
*.js
node_modules
logs
test
*.json
*.yml
`;
const tsconfig = `
{
  "compilerOptions": {
    "lib": ["es2019", "es2020.promise", "es2020.bigint", "es2020.string"],
    "module": "commonjs",
    "target": "es2019",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "filesGlob": ["./**/*.ts", "!./node_modules/**/*.ts"]
}
`;
const prettierrc = `
"semi": true
"trailingComma": "none"
"singleQuote": true
"printWidth": 100
"bracketSpacing": true
"arrowParens": "always"
`;
const eslint = `{
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": ["standard"],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 11,
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint"],
  "rules": {}
}
`;
const gitignore = `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# Diagnostic reports (https://nodejs.org/api/report.html)
report.[0-9]*.[0-9]*.[0-9]*.[0-9]*.json

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
coverage
*.lcov

# nyc test coverage
.nyc_output

# Grunt intermediate storage (https://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# Bower dependency directory (https://bower.io/)
bower_components

# node-waf configuration
.lock-wscript

# Compiled binary addons (https://nodejs.org/api/addons.html)
build/Release

# Dependency directories
node_modules/
jspm_packages/

# Snowpack dependency directory (https://snowpack.dev/)
web_modules/

# TypeScript cache
*.tsbuildinfo

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env
.env.test

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next
out

# Nuxt.js build / generate output
.nuxt
dist

# Gatsby files
.cache/
# Comment in the public line in if your project uses Gatsby and not Next.js
# https://nextjs.org/blog/next-9-1#public-directory-support
# public

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless/

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# Stores VSCode versions used for testing VSCode extensions
.vscode-test

# yarn v2
.yarn/cache
.yarn/unplugged
.yarn/build-state.yml
.yarn/install-state.gz
.pnp.*
`;
const env = `// env file for projects environments`;
const fs = require('fs');
const {execSync} = require('child_process')
const chalk = require('chalk')

function createDirectory(dir) {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
}

function createFile(dir, fileName, data) {
  fs.writeFileSync(dir + '/' + fileName, data);
}
const inquirer = require('inquirer');
async function generate () {
    let { project } = await inquirer.prompt([
        {
            name: 'project',
            message: 'choose the project style',
            type: 'list',
            choices: ['PPS', new inquirer.Separator(), 'HOTWALLET', new inquirer.Separator(), 'BOTH', new inquirer.Separator(), "WEBSERVICE"]
        }
    ]);

    let { directory } = await inquirer.prompt([
        {
            name: 'directory',
            message: 'project main directory',
            type: 'input'
        }
    ]);

    let {projectName} = await inquirer.prompt([
        {
            name: 'projectName',
            message: 'project name',
            type: 'input'
        }
    ])

    await createDirectory(directory);
    await createFile(directory, '.gitignore', gitignore);
    await createFile(directory, 'README.md', '');
    var dir;
    if (project === 'PPS') {
        dir = directory + '/PPS';
        await createDirectory(dir);
        await createDirectory(dir + '/app');
        await createDirectory(dir + '/database');
        await createDirectory(dir + '/configs');
        await createDirectory(dir + '/tests');
        await createFile(dir, '.env', env);
        await createFile(dir, '.eslintrc.json', eslint);
        await createFile(dir, '.prettierignore', prettierignore);
        await createFile(dir, '.prettierrc.yml', prettierrc);
        await createFile(dir, 'tsconfig.json', tsconfig);
        await createFile(dir, 'package.json', generatePackageJson('PPS/' + projectName))
    }
    if (project === 'HOTWALLET') {
        dir = directory + '/HOTWALLET';
        await createDirectory(dir);
        await createDirectory(dir + '/app');
        await createDirectory(dir + '/database');
        await createDirectory(dir + '/configs');
        await createDirectory(dir + '/tests');
        await createFile(dir, '.env', env);
        await createFile(dir, '.eslintrc.json', eslint);
        await createFile(dir, '.prettierignore', prettierignore);
        await createFile(dir, '.prettierrc.yml', prettierrc);
        await createFile(dir, 'tsconfig.json', tsconfig);
        await createFile(dir, 'package.json', generatePackageJson('HW/' + projectName))

    }
    if (project === 'BOTH') {
        dir = directory + '/PPS';
        await createDirectory(dir);
        await createDirectory(dir + '/app');
        await createDirectory(dir + '/database');
        await createDirectory(dir + '/configs');
        await createDirectory(dir + '/tests');
        await createFile(dir, '.env', env);
        await createFile(dir, '.eslintrc.json', eslint);
        await createFile(dir, '.prettierignore', prettierignore);
        await createFile(dir, '.prettierrc.yml', prettierrc);
        await createFile(dir, 'tsconfig.json', tsconfig);
        await createFile(dir, 'package.json', generatePackageJson('PPS/' + projectName))
        dir = directory + '/HOTWALLET';
        await createDirectory(dir);
        await createDirectory(dir + '/app');
        await createDirectory(dir + '/database');
        await createDirectory(dir + '/configs');
        await createDirectory(dir + '/tests');
        await createFile(dir, '.env', env);
        await createFile(dir, '.eslintrc.json', eslint);
        await createFile(dir, '.prettierignore', prettierignore);
        await createFile(dir, '.prettierrc.yml', prettierrc);
        await createFile(dir, 'tsconfig.json', tsconfig);
        await createFile(dir, 'package.json', generatePackageJson('HW/' + projectName))
    }
    if (project === "WEBSERVICE") {
        await createFile(directory, '.env', env);
        await createFile(directory, '.eslintrc.json', eslint);
        await createFile(directory, '.prettierignore', prettierignore);
        await createFile(directory, '.prettierrc.yml', prettierrc);
        await createFile(directory, 'tsconfig.json', tsconfig);
        await createFile(directory, 'package.json', generatePackageJson('SERVICE' + projectName))
    }
    await console.log(chalk.green.italic('Project generated'))
    await console.log(chalk.blue.italic('in each folders'))
    await console.log(chalk.cyan.italic('npm install'))
    process.exit()
}
generate()

