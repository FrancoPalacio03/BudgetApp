class Discharge extends Data {
    static count = 0;
  
    constructor(description, value) {
      super(description, value);
      this._id = ++Discharge.count;
    }
  
    get id() {
      return this._id;
    }
  }