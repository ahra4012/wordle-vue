export interface Keyboard {
  key: string;
  color: string;
}

export const initializeKeyboard = () => {
  const keys = "QWERTYUIOPASDFGHJKL§ZXCVBNM".split("").map((key) => {
    const keyboard: Keyboard = {
      key: key,
      color: "",
    };
    if (key === "§") {
      keyboard.key = "ENTER";
      return keyboard;
    } else {
      return keyboard;
    }
  });
  const keyboard: Keyboard = {
    key: "DELETE",
    color: "",
  };
  keys.push(keyboard);
  return keys;
};
