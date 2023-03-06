import http from "@/api/request";
import { wordDic } from "@/api/interface/index";

export class DictionaryApi {
  wordle = {
    /**
     * @description 랜덤 영문 5글자를 가져온다.
     *
     * @name 조아라
     * @summary 랜덤 영문 5글자 조회
     * @request get : random-word-api.herokuapp.com/word
     */
    getRandomWord: () =>
      http.get<string>(`https://random-word-api.herokuapp.com/word?length=5`),
    /**
     * @description 사용자가 요청한 글자가 영단어에 포함되는 지 확인한다.
     *
     * @name 조아라
     * @summary 영단어 조회
     * @request get : api.dictonaryapi.dev/api/v2/entries/en/:word
     */
    getDicWord: (word: string) =>
      http.get<wordDic.ResWord>(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      ),
  };
}
