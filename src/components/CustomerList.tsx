import { useQuery } from "@apollo/client";
import React from "react";
import styled from "styled-components";

import CustomerListItem from "./CustomerListItem";
import Section from "./Section";
import Text from "./Text";
import Title from "./Title";

import { ListZellerCustomersData } from "../types";
import { LIST_ZELLER_CUSTOMERS } from "../graphql/queries";

const ErrorText = styled(Text)`
  color: red;
  font-size: 1.2em;
`;

const LoadingText = styled(Text)`
  color: #adadac;
  font-size: 1.2em;
`;

interface CustomerListProps {
  role: string;
}

export function CustomerList(props: CustomerListProps) {
  const { role } = props;

  // NOTE: the apollo client will return cached local results following the
  // initial successful fetch, to ensure the data is up to date you are able to
  // refetch this on command or poll the backend, I've left this out to keep
  // this simple for now.
  const { loading, error, data } = useQuery<ListZellerCustomersData>(
    LIST_ZELLER_CUSTOMERS
  );

  // NOTE: the graphapi call returns all customers regardless of role type, to
  // remove the filtering below and improve performance/efficiency I would
  // update the api call to return all users of a particular role type.
  const items = data?.listZellerCustomers?.items || [];
  const customersByRole = items.filter((item: any) => item.role === role);
  const title = `${role} Users`;

  if (loading) {
    return (
      <Section>
        <Title>{title}</Title>
        <LoadingText>Loading users...</LoadingText>
      </Section>
    );
  }

  if (error) {
    return (
      <Section>
        <Title>{title}</Title>
        <ErrorText>
          We were unable to complete your request at this time. Please try again
          or contact support.
        </ErrorText>
      </Section>
    );
  }

  return (
    <Section>
      <Title>{title}</Title>
      {customersByRole.map((customer) => (
        <CustomerListItem
          key={customer.id}
          name={customer.name}
          role={customer.role}
        />
      ))}
    </Section>
  );
}

export default CustomerList;
