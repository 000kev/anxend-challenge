// import { useLoaderData } from "@remix-run/react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useActionData, useLoaderData, Form } from "@remix-run/react";
import { client } from "../utils/db.server";
import e from "../../dbschema/edgeql-js";


export const loader = async ({
    params
}: LoaderFunctionArgs) => {
    // get the input filter from the component from formData
    // console.log("loader", params.filter);

    const q1 = e.select(e.School, school => ({
        id: true,
        name: true,
        address: addr => ({
            townOrCity: true
        })
    }));
    
    const q2 = e.select(e.School, school => ({
        id: true,
        name: true,
        address: addr => ({
            townOrCity: true,
            filter: e.op(addr.townOrCity, 'like', params.filter)
        }),
        filter: e.op('exists', e.set(school.address))
    }));
    
    const result1 = await q1.run(client);
    const result2 = await q2.run(client);
    // console.log(result1[0].address[0].townOrCity);
    return {result1, result2};
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

    // const filter2: string = formData.get("filter_select").toString();
    console.log("filter", filter);
    

    return redirect(`/${filter}`);
}
const getFilters = (arr) => {
    const result = arr.filter((item, index) => arr.indexOf(item) === index);
    return result;
}
export default function ProjectOne() {
    // const action_data = useActionData<typeof action>();
    const loader_data = useLoaderData<typeof loader>();

    // console.log(loader_data);

    return (<>
        <form className="flex-col" method="post" action="/home">
            <span>
                <label>
                    School:
                    <br />
                    <input name="name" type="text" />
                </label>
                <select name="juniorSenior">
                <option value="none" selected disabled hidden>Select School Level</option>
                    <option value="senior">Senior School</option>
                    <option value="junior">Junior School</option>
                </select>
            </span>
            <div>
                <select name="country">
                    <option value="none" selected disabled hidden>Select a Country</option>
                    <option value="South Africa">South Africa</option>
                    <option value="England">England</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Brazil">Brazil</option>
                    <option value="USA">USA</option>
                    <option value="Other">Other</option>
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
                </label>
                <select name="filter">
                    <option value="none" selected disabled hidden>Select a City/Town</option>
                    {
                    getFilters(loader_data.result1.map(el => el.address[0].townOrCity)).map(town => (
                        <option key={town}>{town}</option>
                    ))
                    }
                </select>
                <button type="submit">Filter</button>
            </form>
            {loader_data.result2.map(school => (
                <div key={school.id}>{school.name}</div>
            ))}
        </div>
    </>);
}