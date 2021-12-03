/* eslint-disable */

// because of some weird react/dev/webpack/something quirk
// @ts-ignore
self.$RefreshReg$ = () => {};
// @ts-ignore
self.$RefreshSig$ = () => () => {};

const createWorkerApp = require('react-three-physics').createWorkerApp

// @ts-ignore
const WorkerApp = require('./WorkerApp').WorkerApp

createWorkerApp(WorkerApp)
