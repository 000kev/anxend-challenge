// import { useLoaderData } from "@remix-run/react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { client } from "../utils/db.server";
import e from "../../dbschema/edgeql-js";
import SchoolForm from "../components/school_form";
import DisplaySchool from "../components/school_display";


export const loader = async ({
    params
}: LoaderFunctionArgs) => {

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
    return { result1, result2 };
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
    } else alert('Entry invalid! Data not pushed to database');

    const filter: string = formData.get("filter") === null || undefined
        ? "home"
        : formData.get("filter").toString() === ""
            ? "home"
            : formData.get("filter").toString();

    // const filter2: string = formData.get("filter_select").toString();
    // console.log("filter", filter);

    return redirect(`/${filter}`);
}
export default function ProjectOne() {
    const loader_data = useLoaderData<typeof loader>();
    // console.log(loader_data);

    return (
        <>
            <main className="flex flex-row mb-4">
                <SchoolForm className="flex flex-col basis-1/2" loaderData={loader_data} />
                <DisplaySchool className="basis-1/2" loaderData={loader_data} />
            </main>
        </>

    );
}