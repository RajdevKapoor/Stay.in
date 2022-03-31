const form  = document.getElementById("propertyUpload");
document.body.appendChild(form);

form.addEventListener('submit', handleFormSubmit);

async function handleFormSubmit(event) {

	// validate the form
    const url = form.action;
    event.preventDefault();
    try{
        const formData = new FormData(form);
        const responseData = await postFormDataAsJson({url, formData });
       // console.log({ responseData });
    }
    catch (error) {
		console.error(error);
	}
	// let propertyName = document.getElementById("propertyName").value;
    // let price = document.getElementById("price").value;
    // let description = document.getElementById("description").value;
    // const formData = new FormData(form);

	// document.write(propertyName);
    // document.write(price);
    // document.write(description);  
}

async function postFormDataAsJson({url, formData }) {
    const plainFormData = Object.fromEntries(formData.entries());
	const formDataJsonString = JSON.stringify(plainFormData);
    const fetchOptions = {
        method: "POST",
        headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
        body: formDataJsonString,
    };
    
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
		const errorMessage = await response.text();
		throw new Error(errorMessage);
	}

	return response.json();

	console.log(fetchOptions);
}