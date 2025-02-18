import defaultWords from "./defaultWords.js";

const lastTextFocus = null;

class HistoireController {
  constructor() {
    this.defaultWords = defaultWords;
    this.createWordButtons();

    this.addinput();

    document.querySelector("#redac").onclick = (e) => {
      if (e.target.children.length > 0) {
        e.target.children[e.target.children.length - 1].focus();
      }
    };
  }

  addinput(wordInText = undefined, focus = false) {
    const input = document.createElement("input");
    input.value = " ";
    input.style.width = "2ch";
    input.addEventListener("input", () => {
      input.style.width = input.value.length + 1 + "ch";
    });
    if (wordInText) {
      wordInText.insertAdjacentElement("afterend", input);
    } else {
      const redac = document.querySelector("#redac");
      redac.appendChild(input);
    }
    if (focus) {
      input.focus();
    }
    this.lastTextFocus = input;
    input.addEventListener("focus", (e) => {
      this.lastTextFocus = input;
    });
  }

  createWordButtons() {
    let zoneWords = document.querySelector("#zone-words");
    let i = 0;
    this.defaultWords.forEach((defaultWord) => {
      const button = document.createElement("button");
      const id = i;
      button.innerText = defaultWord;
      button.id = "button-" + i;
      button.className = "button is-primary";
      button.onclick = (button) => {
        this.addWordToText(button, defaultWord, id);
      };
      button.onmouseover = () => {
        const linkedTxtWords = document
          .querySelector("#redac")
          .querySelector(`#word-${id}`);
        if (linkedTxtWords) {
          linkedTxtWords.className += " txt-heighlight";
        }
      };
      button.onmouseout = () => {
        const linkedTxtWords = document
          .querySelector("#redac")
          .querySelector(`#word-${id}`);
        if (linkedTxtWords) {
          linkedTxtWords.className = "";
        }
      };
      zoneWords.appendChild(button);
      i += 1;
    });
  }

  addWordToText(button, word, id) {
    button.target.disabled = true;
    button.target.className = "button is-primary is-disabled";

    const wordInText = document.createElement("span");
    wordInText.innerText = word;
    wordInText.id = "word-" + id;
    wordInText.onclick = () => {
      this.removeWordFromText(button, wordInText);
    };
    wordInText.onmouseover = () => {
      const linkedBtnWords = document
        .querySelector("#zone-words")
        .querySelector(`#button-${id}`);
      if (linkedBtnWords) {
        linkedBtnWords.className += " btn-heighlight";
      }
    };
    wordInText.onmouseout = () => {
      const linkedBtnWords = document
        .querySelector("#zone-words")
        .querySelector(`#button-${id}`);
      if (linkedBtnWords) {
        const newClassName = linkedBtnWords.className.replace(
          "btn-heighlight",
          ""
        );
        linkedBtnWords.className = newClassName;
      }
    };
    this.lastTextFocus.insertAdjacentElement("afterend", wordInText);

    this.addinput(wordInText, true);
  }

  removeWordFromText(button, wordInText) {
    button.target.disabled = false;
    button.target.className = "button is-primary";
    const previousSibling = wordInText.previousSibling;
    const nextSibling = wordInText.nextSibling;
    if (
      previousSibling &&
      previousSibling.tagName === "INPUT" &&
      nextSibling &&
      nextSibling.tagName === "INPUT"
    ) {
      previousSibling.value += nextSibling.value;
      previousSibling.style.width = previousSibling.value.length + "ch";

      previousSibling.addEventListener("input", () => {
        previousSibling.style.width = previousSibling.value.length + "ch";
      });
      nextSibling.remove();
    }
    wordInText.remove();
    previousSibling.focus();
  }
}

let page = document.querySelector("#page");
if (page) {
  window.controller = new HistoireController();
}
