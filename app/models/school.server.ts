import { client } from "../utils/db.server";
import e from "../../dbschema/edgeql-js/index";

const serveLoader = async (filter) => {
    const q1 = e.select(e.School, () => ({
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
            filter: e.op(addr.townOrCity, 'like', filter)
        }),
        filter: e.op('exists', e.set(school.address))
    }));
    const result1 = await q1.run(client);
    const result2 = await q2.run(client);

    return {result1, result2};
}
const serveAction = async (data) => {

    const isSenior: boolean = data.get("juniorSenior")?.toString() === "senior";
    const name: string = data.get("name")?.toString() ?? "";
    const email: string = data.get("email")?.toString() ?? "";
    const country: string = data.get("country")?.toString() ?? "";
    const address_code: string = data.get("addressCode")?.toString() ?? "";
    const town_city: string = data.get("townCity")?.toString() ?? "";
    const name_number: string = data.get("nameNumber")?.toString() ?? "";
    const region: string = data.get("region")?.toString() ?? "";
    const street1: string = data.get("street1")?.toString() ?? "";
    const street2: string = data.get("street2")?.toString() ?? "";
    

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
                emailDomain: email,
                seniorSchool: isSenior,
                juniorSchool: !isSenior
            })
        }).run(client);
    } else console.log('Entry invalid! Data not pushed to database');

    const filter: string = data.get("filter") === null || undefined
        ? "home"
        : data.get("filter").toString() === ""
        ? "home"
        : data.get("filter").toString();

    return filter;
}

export {serveLoader, serveAction}

// const School = { name: "Anxend School" } // Just an example this won't actually run unless it was called.

// const newSchool = await e.insert(e.School, School).run(client)

