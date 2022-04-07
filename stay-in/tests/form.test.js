
import { render } from "nprogress";





describe("Checks If Page contents loaded", ()=>{
    

test(()=>{
    const {getByText, getByLabelText} = render(PropertyForm());
    const fName = getByLabelText("firstName-label");
    expect(fName).tobeTruthy();

    const lName = getByLabelText("lastName-label");
    expect(lName).tobeTruthy();

    const email = getByLabelText("email-label");
    expect(email).tobeTruthy();

    const property = getByLabelText("propertyName-label");
    expect(property).tobeTruthy();

    const rent = getByLabelText("monthlyRent-label");
    expect(rent).tobeTruthy();

    const bed = getByLabelText("bed-label");
    expect(bed).tobeTruthy();

    const bath = getByLabelText("bath-label");
    expect(bath).tobeTruthy();

    const description = getByLabelText("description-label");
    expect(description).tobeTruthy();

    const submit = getByText("Submit");
    expect(submit).tobeTruthy();
});

//WIP

});



describe(PropertyForm(), () => {
 
    test('render email input', () => {
      render(PropertyForm());
   
      const inputEl = screen.getByTestId("email");
      expect(inputEl).toBeInTheDocument();
      expect(inputEl).toHaveAttribute("type", "email");
    });
   
    test('pass valid email to test email input field', () => {
      render(PropertyForm());
   
      const inputEl = screen.getByTestId("email");
      userEvent.type(inputEl, "test@mail.com");
   
      expect(screen.getByTestId("email")).toHaveValue("test@mail.com");
      expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
    });
   
    test('pass invalid email to test input value', () => {
      render(PropertyForm());
   
      const inputEl = screen.getByTestId("email");
      userEvent.type(inputEl, "test");
   
      expect(screen.getByTestId("email")).toHaveValue("test");
      expect(screen.queryByTestId("error-msg")).toBeInTheDocument();
      expect(screen.queryByTestId("error-msg").textContent).toEqual("Please enter a valid email.");
    });
})