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
    let sourceIds: any;
    try {
      const data = await fs.readFile(filePath, {
        encoding: 'utf-8',
      });
      sourceIds = JSON.parse(data) as Record<string, number>;
    } catch (error) {
      sourceIds = {};
    }

    try {
      const sourceId = sourceIds[sourceName] || 1;
      sourceIds[sourceName] = sourceId + 1;
      await fs.writeFile(filePath, JSON.stringify(sourceIds, null, 2), 'utf-8');
      return sourceId;
    } catch (error) {
      console.error(`Error reading file: ${filePath}`, error);
      throw error;
    }
  }
}
