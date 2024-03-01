import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import SchoolForm from "../components/school_form";
import DisplaySchool from "../components/school_display";
import { serveLoader, serveAction } from "../models/school.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
    const { result1, result2 } = await serveLoader(params.filter);
    return { result1, result2 };
}
export const action = async ({ request }: ActionFunctionArgs) => {
    const filter: string = await serveAction(await request.formData());
    return redirect(`/${filter}`);
}
export default function ProjectOne() {
    const loader_data = useLoaderData<typeof loader>();

    return (
        <>
            <main className="flex flex-row mb-4">
                <SchoolForm className="flex flex-col basis-1/2" loaderData={loader_data} />
                <DisplaySchool className="basis-1/2" loaderData={loader_data} />
            </main>
        </>

    );
}