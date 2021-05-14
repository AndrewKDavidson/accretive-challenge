import React, { useState } from "react";
// import PropTypes from "prop-types";

const JustifyText = () => {
  const [length, setLineLength] = useState(0);
  const [text, setJustifyString] = useState("");
  const [justifiedText, setJustifiedText] = useState(``);

  const justify = () => {
    // split string by length into multiple lines
    const regex = RegExp("(?:\\s|^)(.{1," + length + "})(?=\\s|$)", "g");
    const condensedArray = [];
    let t = [];
    let finalString = "";

    // add each line to array
    while ((t = regex.exec(text)) !== null) {
      condensedArray.push(t[1]);
    }

    // check length of all text in array
    const checkLength = (arr) => {
      let totalLength = "";
      for (let i = 0; i < arr.length; i++) {
        totalLength = totalLength + arr[i];
      }
      if (totalLength.length >= length) {
        return true;
      }
    };

    // iterate over each line of text to justify
    for (let k = 0; k < condensedArray.length; k++) {
      // split string by whitespace into arr removing extra whitespace on the ends of string
      const stringArr = condensedArray[k].trim().split(/\s+/);
      while (!checkLength(stringArr)) {
        for (let i = 0; i < stringArr.length - 1; i++) {
          stringArr[i] = stringArr[i] + " ";
          if (checkLength(stringArr)) {
            finalString = `${finalString}
${stringArr.join("")}`;
            break;
          }
        }
      }
    }
    setJustifiedText(finalString);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // quick validation to alleviate errors. Replace with proper validation and error handling
    const splitText = text.split(' ');
    const checkTextLength = () => {
      for (let i = 0; i < splitText.length; i++) {
        if (splitText[i].length > length){
          return false;
        }
      }
      return true;
    }
    if ((splitText.length >= 2) && (checkTextLength())){
      justify();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Text to justify:
          <br />
          <textarea
            rows={8}
            cols={40}
            name="justifyText"
            value={text}
            onChange={(e) => setJustifyString(e.target.value)}
          />
        </label>
        <label>
          Desired line length:
          <input
            name="lineLength"
            type="text"
            value={length}
            onChange={(e) => setLineLength(e.target.value.replace(/\D/, ""))}
          />
        </label>
        <input type="submit" value="Justify" />
        <pre>{justifiedText}</pre>
      </form>
    </div>
  );
};

export default JustifyText;
