import { logMessage } from "../../common/utils/logMessage.js";
import { oleoduc, readLineByLine, transformData, writeData } from "oleoduc";
import fs from "fs";
import path from "path";
import config from "../../config.js";
import __dirname from "../../common/dirname.js";
const currentDirname = __dirname(import.meta.url);
const filePath = path.join(currentDirname, "./assets/predictions.csv");

const seuilElimination = config.private.lbb.score50Level;

let predictionMap = {};
let count = 0;

const parseLine = (line) => {
  const terms = line.split(";");

  if (count % 50000 === 0) {
    logMessage("info", ` -- update init predictions ${count}`);
  }
  count++;

  if (count > 1) {
    return {
      siret: terms[0].padStart(14, "0"),
      score: terms[1],
    };
  } else {
    return null;
  }
};

const computeLine = async ({ siret, score }) => {
  if (score >= seuilElimination) {
    predictionMap[siret] = score;
  }
};

export default async function () {
  try {
    logMessage("info", " -- Start init predictionMap -- ");
    logMessage("info", ` -- Seuil d'élimination : ${seuilElimination}`);

    await oleoduc(
      fs.createReadStream(filePath),
      readLineByLine(),
      transformData((line) => parseLine(line)),
      writeData(async (line) => computeLine(line))
    );

    logMessage("info", `End init predictionMap`);
  } catch (err) {
    logMessage("error", err);
  }

  count = 0;

  return predictionMap;
}