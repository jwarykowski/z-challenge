import "jest-styled-components";
import { MockedProvider } from "@apollo/client/testing";
import { render, waitFor } from "@testing-library/react";

import CustomerList from "./CustomerList";
import { ZELLER_ADMIN } from "../constants";
import { LIST_ZELLER_CUSTOMERS } from "../graphql/queries";

test("renders role title header", () => {
  expect.assertions(1);

  const role = "Superadmin";

  const { getByText } = render(
    <MockedProvider addTypename={false}>
      <CustomerList role={role} />
    </MockedProvider>
  );

  expect(getByText("Superadmin Users")).toBeInTheDocument();
});

test("renders customer list component when request loading", () => {
  expect.assertions(2);

  const role = ZELLER_ADMIN;

  const { container, getByText } = render(
    <MockedProvider addTypename={false}>
      <CustomerList role={role} />
    </MockedProvider>
  );

  // loading text
  expect(getByText("Loading users...")).toBeInTheDocument();

  expect(container.firstChild).toMatchSnapshot();
});

test("renders customer list component when request errors", async () => {
  expect.assertions(2);

  const listCustomersMock = {
    request: {
      query: LIST_ZELLER_CUSTOMERS,
    },
    error: new Error("Uh oh!"),
  };

  const mocks = [listCustomersMock];
  const role = ZELLER_ADMIN;

  const { container, findByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <CustomerList role={role} />
    </MockedProvider>
  );

  const errorText = await findByText(
    "We were unable to complete your request at this time. Please try again or contact support."
  );

  expect(errorText).toBeInTheDocument();

  expect(container.firstChild).toMatchSnapshot();
});

test("renders customer list when request successful", async () => {
  expect.assertions(3);

  const listCustomersMock = {
    request: {
      query: LIST_ZELLER_CUSTOMERS,
    },
    result: {
      data: {
        listZellerCustomers: {
          items: [
            {
              email: "customer@zeller.com",
              id: "customer1",
              name: "Jonathan Warykowski",
              role: ZELLER_ADMIN,
            },
          ],
        },
      },
    },
  };

  const mocks = [listCustomersMock];

  const { container, queryByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <CustomerList role={ZELLER_ADMIN} />
    </MockedProvider>
  );

  await waitFor(() => {
    expect(queryByText("Loading users...")).not.toBeInTheDocument();
  });

  expect(container.firstChild).toMatchSnapshot();
});
