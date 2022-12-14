import fs from "fs";
import type { Library } from "h5p-types";
import path from "path";

export async function readLibrary(directory: string): Promise<Library> {
  const libraryPath = path.join(directory, "library.json");
  let libraryString: string;

  try {
    libraryString = (await fs.promises.readFile(libraryPath)).toString("utf-8");
  } catch (error) {
    console.error(error);
    throw new Error(`Could not find library file at '${libraryPath}'.`);
  }

  let library: Library;

  try {
    library = JSON.parse(libraryString);
  } catch (error) {
    console.error(error);
    throw new Error(`Could not parse library file.`);
  }

  return library;
}
