// import obj from "../../dbschema/edgeql-js/index"
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/react";
import { client } from "../utils/db.server";

export const loader = async () => {
    const result = await client.query(`select 2 + 2;`)
    let message = "The result is " + result + "\nThe db query was succesful.";
    return message;
}

export default function ProjectOne() {
    const lx = useLoaderData<typeof loader>();

    const goToServer = () => {
        console.log(lx);
    }

    return (
        <>
            <h1>Hello World!!!</h1>
            <button
                className="mt-8 inline-block rounded-full bg-anxpurple-700 px-16 py-4 font-montserrat text-white hover:bg-anxwhite-300 hover:text-anxgreen-300 hover:shadow-xl"
                onClick={goToServer}
            >
                Add to DB</button>
        </>
    );
}