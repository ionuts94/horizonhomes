import React from 'react';
import { CategoryPage } from 'components';

export function Sales() {
  return <CategoryPage
    category='sale'
    pageTitle='For Sale'
    noDataMessage='There are no places for sale at the moment. Please come back later.'
  />
}
