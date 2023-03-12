import React from 'react';
import { CategoryPage } from 'components';

export function Rents() {
  return <CategoryPage
    category='rent'
    pageTitle='For Rent'
    noDataMessage='There are no places for rent at the moment. Please come back later.'
  />
}
