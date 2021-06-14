import gql from 'graphql-tag';

export default gql`query AllCategories($shopId: ID!) {
  tags(shopId: $shopId) {
    totalCount
    nodes {
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
  }
}`;
