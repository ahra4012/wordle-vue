import { DictionaryApi } from "@/api/modules/word";

export class apiMgr {
  dictionary = new DictionaryApi();
}

export const api = new apiMgr();
