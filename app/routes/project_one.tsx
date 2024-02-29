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
export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();

    const name = formData.get("name").toString();
    const isSenior = formData.get("juniorSenior").toString() === "senior";
    const country = formData.get("country").toString();
    const address_code = formData.get("addressCode").toString();
    const town_city = formData.get("townCity").toString();
    const name_number = formData.get("nameNumber").toString();
    const region = formData.get("region").toString();
    const street1 = formData.get("street1").toString();
    const street2 = formData.get("street2").toString();

    // e.insert(e.School, {
    //     name: "St. Martins"
    // }).run(client);

    let entry = {
        name: name,
        juniorSchool: false,
        seniorSchool: true,
        country: country,
        addressCode: address_code,
        townOrCity: town_city,
        nameOrNumber: name_number,
        region: region,
        street: street1,
        street2: street2
    }

    const entryQuery = e.insert(e.Address, {
        addressCode: address_code,
        country: country,
        nameOrNumber: name_number,
        townOrCity: town_city,
        region: region,
        street: street1,
        street2: street2,
        organisation: e.insert(e.School, {
            name: name,
            seniorSchool: isSenior,
            juniorSchool: !isSenior
        })
    });
    entryQuery.run(client);

    return entry;
}

export default function ProjectOne() {
    const data = useActionData<typeof action>();
    console.log(data);

    return (
        <Form className="flex-col" method="post" action="/project_one">
            <span>
                <label>
                    School:
                    <br />
                    <input name="name" type="text" />
                </label>
                <select name="juniorSenior">
                    <option value="senior">Senior School</option>
                    <option value = "junior">Junior School</option>
                </select>
            </span>
            <div>
                <select name="country">
                    <option>South Africa</option>
                    <option>England</option>
                    <option>Germany</option>
                    <option>France</option>
                    <option>Brazil</option>
                    <option>USA</option>
                </select>
            </div>
            <div>
                <label>
                    Address Code:
                    <br />
                    <input name="addressCode" type="text" />
                </label>
            </div>
            <div>
                <label>
                    Town/City:
                    <br />
                    <input name="townCity" type="text" />
                </label>
            </div>
            <div>
                <label>
                    Region:
                    <br />
                    <input name="region" type="text" />
                </label>
            </div>
            <div>
                <label>
                    Street1
                    <br />
                    <input name="street1" type="text" />
                </label>
            </div>
            <div>
                <label>
                    Street2:
                    <br />
                    <input name="street2" type="text" />
                </label>
            </div>
            <div>
                <label>
                    Street Name/Number
                    <br />
                    <input name="nameNumber" type="text" />
                </label>
            </div>
            <div>
                <button type="submit">Create</button>
            </div>
        </Form>
    );
}