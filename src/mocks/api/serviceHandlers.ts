import { rest } from "msw";
import { resWord } from "@/mocks/api/data/serviceData";

const serviceHandlers = [
  rest.get(
    "https://random-word-api.herokuapp.com/word?length=5",
    (req, res, ctx) => {
      return res(
        ctx.status(200), //응답상태설정
        ctx.delay(1000), //응답 시간 설정
        ctx.json(["polis"])
      );
    }
  ),

  rest.get(
    "https://api.dictionaryapi.dev/api/v2/entries/en/:word",
    (req, res, ctx) => {
      return res(
        ctx.status(500), //응답상태설정
        ctx.delay(1000), //응답 시간 설정
        ctx.json(resWord)
      );
    }
  ),
];
export default serviceHandlers;
