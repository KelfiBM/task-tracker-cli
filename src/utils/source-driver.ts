import fs from 'fs/promises';

import { PathBuilder } from '../utils/path-builder';

const fileExtension = 'json';
const sourceIdFileName = 'source-id.json';

export class SourceDriver {
  static async read<SourceType>(sourceName: string): Promise<SourceType[]> {
    const filePath = PathBuilder.dataPath(`${sourceName}.${fileExtension}`);
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data) as SourceType[];
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        return [];
      }
      console.error(`Error reading file: ${filePath}`, error);
      throw error;
    }
  }

  static async update<SourceType>(
    sourceName: string,
    values: SourceType[]
  ): Promise<void> {
    const filePath = PathBuilder.dataPath(`${sourceName}.${fileExtension}`);
    try {
      const data = JSON.stringify(values, null, 2);
      await fs.writeFile(filePath, data, 'utf-8');
    } catch (error) {
      console.error(`Error writing file: ${filePath}`, error);
      throw error;
    }
  }

  static async generateId(sourceName: string): Promise<number> {
    const filePath = PathBuilder.dataPath(sourceIdFileName);
    try {
      const file = await fs.open(filePath, 'w+');
      const data = await file.readFile({ encoding: 'utf-8' });
      const sourceIds = JSON.parse(data) as Record<string, number>;
      const sourceId = sourceIds[sourceName] || 1;
      sourceIds[sourceName] = sourceId + 1;
      await file.writeFile(JSON.stringify(sourceIds, null, 2), 'utf-8');
      await file.close();
      return sourceId;
    } catch (error) {
      console.error(`Error reading file: ${filePath}`, error);
      throw error;
    }
  }
}
