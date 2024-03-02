import { Form } from "@remix-run/react";
import DBAlert from "./alert";

export default function DisplaySchools(props) {
    const loader_data = props.loaderData;

    const getFilters = (arr) => {
        const result = arr.filter((item, index) => arr.indexOf(item) === index);
        return result;
    }

    return (
        <section className={props.className}>
            <h1 className="font-montserrat text-4xl text-white drop-shadow-xl">Schools Near You</h1>
            <Form className="flex flex-col" method="post" action="/home">
                <label className="mt-4 font-montserrat text-base text-white">
                    Filter Schools by City or Town:
                </label>
                <span>
                    <select className="w-64 mt-4 font-montserrat text-base text-black" defaultValue="" name="filter">
                        <option value="" disabled hidden>Select a City/Town</option>
                        {
                        getFilters(loader_data.result1.map(el => el.address[0].townOrCity)).map(town => (
                            <option key={town}>{town}</option>
                        ))
                        }
                    </select>
                    <button className="mt-8 ml-8 inline-block rounded-full bg-anxpurple-700 px-8 py-1.5 font-montserrat text-white hover:bg-anxwhite-300 hover:text-anxgreen-300 hover:shadow-xl" type="submit">Filter</button>
                </span>
            </Form>
            {
            loader_data.result2.length === 0 
            ? <DBAlert/>
            : loader_data.result2.map(school => (
                <div className="mt-5 font-montserrat text-base text-white " key={school.id}>{school.name}</div>
            ))
            }
        </section>
    );
}