class Income extends Data {
    static count = 0;
  
    constructor(description, value) {
      super(description, value);
      this._id = ++Income.count;
    }
  
    get id() {
      return this._id;
    }
  }