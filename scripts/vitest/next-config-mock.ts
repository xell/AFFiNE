export default function getConfig() {
  return {
    publicRuntimeConfig: {
      PROJECT_NAME: 'AFFiNE Mock',
      BUILD_DATE: '2021-09-01T00:00:00.000Z',
      gitVersion: 'UNKNOWN',
      hash: 'UNKNOWN',
      editorVersion: 'UNKNOWN',
      serverAPI: 'http://127.0.0.1:3000/',
      enableBroadCastChannelProvider: true,
      enableIndexedDBProvider: true,
      enableDebugPage: true,
      prefetchWorkspace: false,
      exposeInternal: true,
      enableSubpage: true,
      enableChangeLog: true,
    },
  };
}
