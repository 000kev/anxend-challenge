import { Form, useNavigation, useActionData } from "@remix-run/react";

export default function SchoolForm(props) {
    const navigation = useNavigation();
    

    return (
        <Form className={props.className} method="post" action="/home">
            <h1 className="font-montserrat text-5xl text-white drop-shadow-xl">Add School</h1>
            <label className="mt-8 font-montserrat text-xl text-white">
                School:
                <br />
                <input className="w-64 text-black" required disabled={navigation.state === "submitting"} name="name" type="text" />
            </label>
            <select className="mt-8 w-64 font-montserrat text-xl text-black" disabled={navigation.state === "submitting"} defaultValue="" name="juniorSenior">
                <option value="" disabled hidden>Select School Level</option>
                <option value="senior">Senior School</option>
                <option value="junior">Junior School</option>
            </select>
            
            <div>
                <select required className="mt-8 mb-8 w-64 font-montserrat text-xl text-black" disabled={navigation.state === "submitting"} defaultValue="" name="country">
                    <option value="" disabled hidden>Select a Country</option>
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
                <label className="mt-8 font-montserrat text-xl text-white">
                    Address Code:
                    <br />
                    <input required className="mb-3 w-64 text-black" disabled={navigation.state === "submitting"} name="addressCode" type="text" />
                </label>
            </div>
            <div>
                <label className="mt-8 font-montserrat text-xl text-white">
                    Town/City:
                    <br />
                    <input required className="mb-3 w-64" disabled={navigation.state === "submitting"} name="townCity" type="text" />
                </label>
            </div>
            <div>
                <label className="mt-8 font-montserrat text-xl text-white">
                    Region:
                    <br />
                    <input className="mb-3 w-64 text-black" disabled={navigation.state === "submitting"} name="region" type="text" />
                </label>
            </div>
            <div>
                <label className="mt-8 font-montserrat text-xl text-white">
                    Street 1:
                    <br />
                    <input className="mb-3 w-64 text-black" disabled={navigation.state === "submitting"} name="street1" type="text" />
                </label>
            </div>
            <div>
                <label className="mt-8 font-montserrat text-xl text-white">
                    Street 2:
                    <br />
                    <input className="mb-3 w-64 text-black" disabled={navigation.state === "submitting"} name="street2" type="text" />
                </label>
            </div>
            <div>
                <label className="mt-8 font-montserrat text-xl text-white">
                    Street Name/Number:
                    <br />
                    <input required className="mb-3 w-64 text-black" disabled={navigation.state === "submitting"} name="nameNumber" type="text" />
                </label>
            </div>
            <div>
                <button className="mt-8 inline-block rounded-full bg-anxpurple-700 px-16 py-4 font-montserrat text-white hover:bg-anxwhite-300 hover:text-anxgreen-300 hover:shadow-xl" type="submit">
                    {navigation.state === "submitting"
                        ? "Creating..." : "Create"
                    }
                </button>
            </div>
        </Form>
    )
}