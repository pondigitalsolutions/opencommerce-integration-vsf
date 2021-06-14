import gql from 'graphql-tag';

export default gql`query AllCategories($shopId: ID!, $tagId: String!) {
  tag(shopId: $shopId, slugOrId: $tagId) {
    _id
    displayTitle
    name
    slug
    createdAt
    updatedAt
    isDeleted
    isVisible
    isTopLevel
  }
}`;
