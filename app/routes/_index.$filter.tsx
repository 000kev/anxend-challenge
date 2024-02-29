// import { useLoaderData } from "@remix-run/react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData, useLoaderData, useFetcher, Form } from "@remix-run/react";
import { client, db } from "../utils/db.server";
import e from "../../dbschema/edgeql-js";
import { exists } from "edgedb/dist/adapter.node";


export const loader = async ({
    params
}: LoaderFunctionArgs) => {
    // get the input filter from the component from formData
    console.log("loader", params.filter);
    
    const query = e.select(e.School, school => ({
        id: true,
        name: true,
        address: addr => ({
            townOrCity: true,
            filter: e.op(addr.townOrCity, 'like', 'Nelspruit')
        }),
        filter: e.op('exists', e.set(school.address))
    }));
    const result = await query.run(client);
    return result;
}
export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const isSenior: boolean = formData.get("juniorSenior")?.toString() === "senior";
    const name: string = formData.get("name")?.toString() ?? "";
    const country: string = formData.get("country")?.toString() ?? "";
    const address_code: string = formData.get("addressCode")?.toString() ?? "";
    const town_city: string = formData.get("townCity")?.toString() ?? "";
    const name_number: string = formData.get("nameNumber")?.toString() ?? "";
    const region: string = formData.get("region")?.toString() ?? "";
    const street1: string = formData.get("street1")?.toString() ?? "";
    const street2: string = formData.get("street2")?.toString() ?? "";

    const minimumRequiremets: boolean = (
        name !== "" && 
        address_code !== "" && 
        country !== "" && 
        name_number !== "" && 
        town_city !== ""
    )
    if (minimumRequiremets) {
        e.insert(e.Address, {
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
        }).run(client); 
    } else console.log("Invalid DB entry")

    const filter: string = formData.get("filter") === null || undefined 
    ? "home" 
    : formData.get("filter").toString() === "" 
    ? "home" 
    : formData.get("filter").toString();
    

    return redirect(`/${filter}`);
}

export default function ProjectOne() {
    // const action_data = useActionData<typeof action>();
    const loader_data = useLoaderData<typeof loader>();

    console.log(loader_data);

    return (<>
        <form className="flex-col" method="post" action="/home">
            <span>
                <label>
                    School:
                    <br />
                    <input name="name" type="text" />
                </label>
                <select name="juniorSenior">
                    <option value="senior">Senior School</option>
                    <option value="junior">Junior School</option>
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
        </form>
        <br />
        <div>
            <h2>Display Schools</h2>
            <form className="flex-col" method="post" action="/home">
                <label>
                    Filter Schools by Town/City:
                    <br />
                    <input name="filter" type="text"/>
                </label>
                <button type="submit">Filter</button>
            </form>
            {loader_data.map(school => (
                <div key={school.id}>{school.name}</div>
            ))}
        </div>
    </>);
}