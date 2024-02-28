// import { useLoaderData } from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/node";
import { useActionData, Form } from "@remix-run/react";
import { client, db } from "../utils/db.server";
import e from "../../dbschema/edgeql-js";
import { redirect } from "@remix-run/node";



// export const loader = async () => {
//     // const result = await client.query(`select 2 + 2;`)
//     // let message = "The result is " + result + "\nThe db query was succesful.";
//     // return message;
//     const query = e.insert(e.School, {
//         name: "Marian College"
//     });
//     const result = await query.run(client);
//     return "Successful add";
// }
export const action = async ({request}: ActionFunctionArgs) => {
    const formData = await request.formData();
    const name = formData.get("name");
    const description = formData.get("description");
    // e.insert(e.School, {
    //     name: "St. Martins"
    // }).run(client);

    return {name: name, description: description};
}

export default function ProjectOne() {
    const data = useActionData<typeof action>();
    console.log(data);

    return (
        <Form className="flex-col" method="post" action="/project_one">
        <p>
          <label>
            School:
            <br />
            <input name="name" type="text"/>
          </label>
        </p>
        <p>
          <label>
            Address:
            <br />
            <textarea name="description" />
          </label>
        </p>
        <p>
          <button type="submit">Create</button>
        </p>
      </Form>
    );
}