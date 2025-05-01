import Path from 'path';

const dataFolder = 'data';

export const PathBuilder = {
  dataPath: (fileName?: string) => {
    return Path.resolve(
      Path.dirname(require.main?.filename || process.cwd()),
      '..',
      dataFolder,
      fileName ? fileName : ''
    );
  },
};
