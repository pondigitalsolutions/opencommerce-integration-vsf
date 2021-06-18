import gql from 'graphql-tag';

export default gql`query AllCategories($shopId: ID!, $first: ConnectionLimitInt, $offset: Int, $isToplevel: Boolean) {
  tags(
    shopId: $shopId
    first: $first
    offset: $offset
    isTopLevel: $isToplevel
  ) {
    totalCount
    nodes {
      _id
      displayTitle
      isTopLevel
      slug
      name
      heroMediaUrl
      isDeleted
      isVisible
      position
      subTagIds
      createdAt
      updatedAt
      subTags {
        nodes {
          _id
          displayTitle
          name
          slug
        }
      }
    }
  }
}`;
