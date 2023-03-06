export interface Result {
  code: number;
  message: string;
}

export interface ResultData<T = any> extends Result {
  result: T;
}

export namespace wordDic {
  export interface ResRandomWord {
    randomWord: string;
  }
  export interface ResWord {
    title: string;
    word: string;
    phonetics: string[];
    meanings: string[];
  }
}
