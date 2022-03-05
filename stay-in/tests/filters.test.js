

import { render } from "nprogress";
import Search from "../pages/search";




describe("Check if API returning right", ()=>{
    test( async()=>{
        const responseRaw = await fetchApi(`https://bayut.p.rapidapi.com/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`);
        const response = responseRaw?.hits[0].purpose;

        expect(response === "for-sale");
//   g = mount(response[0]);
//   g.find("h1");
// propertiesForRent.map((property) => <Property property={property} key={property.id}

    });
test(()=>{
    const {getByText, getByLabelText} = render(<Search />);
    const email = getByLabelText('Purpose');
    expect(email).tobeTruthy();
    const password = getByLabelText('Password');
    const signInButton = getByText('Sign In');
});

//WIP

});