// @flow
import {
  AsyncStorage,
} from 'react-native';

class SyncStorage {
  data: Map = new Map();
  loading: boolean = true;

  init(keys: Array<string>) {
    return AsyncStorage.multiGet(keys)
      .then((data: Array<Array<string>>) => {
        data.forEach((item: Array<string>) => {
          this.data.set(item[0], JSON.parse(item[1]));
          this.loading = false;
        });

        return this.data;
      });
  }

  getData(key: string): any {
    return this.data.get(key);
  }

  setData(key: string, value: any, dontTryAgain?: boolean) {
    this.data.set(key, value);

    AsyncStorage.setItem(key, JSON.stringify(value))
      .catch(() => {
        if (!dontTryAgain) {
          this.setData(key, value, true);
        }
      });
  }

  removeData(key: string) {
    this.data.delete(key);
    AsyncStorage.removeItem(key);
  }
}

const syncStorage = new SyncStorage();

export default syncStorage;