import type { StorageData } from '../models/storage-data';

export class LocalStorageManager {
  private static readonly STORAGE_KEY = 'sprintPokerData';

  static saveData(data: StorageData): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  static getData(): StorageData | null {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  }

  static clearData(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  static getRoomId(): string | null {
    const data = this.getData();
    return data?.roomId || null;
  }

  static getUserId(): string | null {
    const data = this.getData();
    return data?.userId || null;
  }
}
