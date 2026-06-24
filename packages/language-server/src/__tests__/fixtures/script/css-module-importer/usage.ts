// A plain TS importer must be left to the user's own CSS module resolution,
// not silently bound to Marko's virtual module typing.
import styles from "./styles.module.css";

export const cls = styles.button;
