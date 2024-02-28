import { createClient } from "edgedb"
import db from "#dbschema/edgeql-js/index"

const client = createClient();

export { client }
