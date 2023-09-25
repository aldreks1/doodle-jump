class LocalStorageUtil {
  constructor() {
    this.keyName = "record";
  }
  getRecord() {
    const recordLocalStorage = localStorage.getItem(this.keyName);
    if (recordLocalStorage !== null) {
      return recordLocalStorage;
    }
    return 0;
  }

  putRecord(score) {
    let record = this.getRecord();
    if (score > record) {
      record = score;
    }
    localStorage.setItem(this.keyName, record);
    return record;
  }
}

const localStorageUtil = new LocalStorageUtil();
