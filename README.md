# SIPM (sistem-informasi-pengaduan-masyarakat)

Sistem Informasi Pengaduan Masyarakat

## Demo
https://oprec-upt-tik.web.app/complaints

## Requirements
- NPM (included when installing [node.js](https://nodejs.org/))
- Quasar CLI (https://quasar.dev/quasar-cli/installation)
- Firebase project

## Install the dependencies
```bash
npm install
```

## Place your Firebase configuration
Copy `src/firebase.example.ts` to `src/firebase.ts` then paste your firebase configuration into `firebaseConfig` constants!

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
npm run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
