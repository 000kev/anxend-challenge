import { Form, useNavigation } from "@remix-run/react";

export default function SchoolForm(props) {
    const navigation = useNavigation();

    const clearFields = () => {
        navigation?.formData.set("name", "");
        navigation?.formData.set("email", "");
        navigation?.formData.set("name", "");
        navigation?.formData.set("juniorSenior", "");
        navigation?.formData.set("country", "");
        navigation?.formData.set("addressCode", "");
        navigation?.formData.set("townCity", "");
        navigation?.formData.set("region", "");
        navigation?.formData.set("street1", "");
        navigation?.formData.set("street2", "");
        navigation?.formData.set("nameNumber", "");

    }

    return (
        <section className={props.className} >
            <Form onSubmit={ clearFields } className="flex flex-col" method="post" action="/home">
                <h1 className="font-montserrat text-4xl text-white drop-shadow-xl">Add School</h1>
                <label className="mt-5 font-montserrat text-base text-white">
                    School:
                    <br />
                    <input className="h-7 w-64 text-black" required disabled={navigation.state === "submitting"} name="name" type="text" />
                </label>
                <label className="mt-2 font-montserrat text-base text-white">
                    Email Domain:
                    <br />
                    <input className="h-7 w-64 text-black" required disabled={navigation.state === "submitting"} name="email" type="text" />
                </label>
                <select className="h-10 mt-5 w-64 font-montserrat text-base text-black" disabled={navigation.state === "submitting"} defaultValue="" name="juniorSenior">
                    <option value="" disabled hidden>Select School Level</option>
                    <option value="senior">Senior School</option>
                    <option value="junior">Junior School</option>
                </select>
                <select required className="h-10 mt-5 mb-2 w-64 font-montserrat text-base text-black" disabled={navigation.state === "submitting"} defaultValue="" name="country">
                    <option value="" disabled hidden>Select a Country</option>
                    <option value="South Africa">South Africa</option>
                    <option value="England">England</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Brazil">Brazil</option>
                    <option value="USA">USA</option>
                    <option value="Other">Other</option>
                </select>
                <label className="mt-2 font-montserrat text-base text-white">
                    Address Code:
                    <br />
                    <input required className="h-7 mb-3 w-64 text-black" disabled={navigation.state === "submitting"} name="addressCode" type="text" />
                </label>
                <label className="mt-0.5 font-montserrat text-base text-white">
                    Town/City:
                    <br />
                    <input required className="h-7 mb-3 w-64 text-black" disabled={navigation.state === "submitting"} name="townCity" type="text" />
                </label>
                <label className="mt-0.5 font-montserrat text-base text-white">
                    Region:
                    <br />
                    <input className="h-7 mb-3 w-64 text-black" disabled={navigation.state === "submitting"} name="region" type="text" />
                </label>
                <label className="mt-0.5 font-montserrat text-base text-white">
                    Street 1:
                    <br />
                    <input className="h-7 mb-3 w-64 text-black" disabled={navigation.state === "submitting"} name="street1" type="text" />
                </label>
                <label className="mt-0.5 font-montserrat text-base text-white">
                    Street 2:
                    <br />
                    <input className="h-7 mb-3 w-64 text-black" disabled={navigation.state === "submitting"} name="street2" type="text" />
                </label>
                <label className="mt-0.5 font-montserrat text-base text-white">
                    Street Name/Number:
                    <br />
                    <input required className="h-7 mb-3 w-64 text-black" disabled={navigation.state === "submitting"} name="nameNumber" type="text" />
                </label>
                <button className="w-64 mt-4 inline-block rounded-full bg-anxpurple-700 px-16 py-4 font-montserrat text-white hover:bg-anxwhite-300 hover:text-anxgreen-300 hover:shadow-xl" type="submit">
                    {navigation.state === "submitting"
                        ? "Creating..." : "Create"
                    }
                </button>
            </Form>
        </section>
    )
}