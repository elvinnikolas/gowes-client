import gql from 'graphql-tag'

//QUERY
export const GET_POSTS = gql`
    query {
        getPosts {
            _id
            user
            name
            date
            title
            content
            likes{
                _id
                user
            }
            dislikes{
                _id
                user
            }
            bookmarks{
                _id
                user
                date
            }
            comments{
                _id
                user
                comment
            }
            community {
                _id
                name
            }
        }
    }
`

export const GET_BOOKMARK_POSTS = gql`
  query {
      getBookmarkPosts {
            _id
            user
            name
            title
            date
            content
            likes {
                _id
                user
            }
            comments {
                _id
                user
                name
                date
                comment
            }
            dislikes {
                _id
                user
            }
            bookmarks {
                _id
                user
                date
            }
            community {
                _id
                name
            }
      }
  }
`

export const GET_USER_COMMUNITIES_POSTS = gql`
  query {
      getUserCommunitiesPosts {
            _id
            user
            name
            title
            date
            content
            likes {
                _id
                user
            }
            comments {
                _id
                user
                name
                date
                comment
            }
            dislikes {
                _id
                user
            }
            bookmarks {
                _id
                user
                date
            }
            community {
                _id
                name
            }
    }
  }
`

export const GET_USER_COMMUNITIES = gql`
  query {
    getUserCommunities(userId: $id) {
        _id
        community {
            _id
            name
            bio
        }
    }
  }
`

//FETCH QUERIES
export const FETCH_QUERY_HOME = gql`
  query($id: ID!, $communityId: ID!) {
    getUserCommunities(userId: $id) {
        _id
        community {
            _id
            name
            bio
        }
    }
    getUserCommunitiesPosts {
        _id
        user
        name
        title
        date
        content
        likes {
            _id
            user
        }
        comments {
            _id
            user
            name
            date
            comment
        }
        dislikes {
            _id
            user
        }
        bookmarks {
            _id
            user
            date
        }
        community {
            _id
            name
        }
    }
    getUserCommunityPosts(communityId: $communityId) {
        _id
        user
        name
        title
        date
        content
        likes {
            _id
            user
        }
        comments {
            _id
            user
            name
            date
            comment
        }
        dislikes {
            _id
            user
        }
        bookmarks {
            _id
            user
            date
        }
        community {
            _id
            name
        }
    }
  }
`

export const FETCH_QUERY_PROFILE = gql`
  query($id: ID!) {
      getUser(id: $id) {
        _id
        name
        bio
      }
      getUserPosts(id: $id) {
        _id
        user
        name
        date
        title
        content
        likes{
            _id
            user
        }
        dislikes{
            _id
            user
        }
        bookmarks{
            _id
            user
            date
        }
        comments{
            _id
            user
            comment
        }
        community {
            _id
            name
        }
      }
      getUserCommunities(userId: $id) {
        _id
        community {
            _id
            name
            bio
        }
      }
  }
`

export const GET_USER = gql`
    query($id: ID!) {
        getUser(id: $id) {
            _id
            name
            bio
        }
    }
`

//MUTATION
export const LIKE_POST = gql`
  mutation likePost(
      $postId: ID!
    ) {
        likePost(postId: $postId) {
            _id
            likes {
                _id
                user
            }
            dislikes {
                _id
                user
            }
        }
    }
`

export const DISLIKE_POST = gql`
  mutation dislikePost(
      $postId: ID!
    ) {
        dislikePost(postId: $postId) {
            _id
            likes {
                _id
                user
            }
            dislikes {
                _id
                user
            }
        }
    }
`

export const BOOKMARK_POST = gql`
  mutation bookmarkPost(
      $postId: ID!
    ) {
        bookmarkPost(postId: $postId) {
            _id
            user
            name
            title
            date
            content
            likes {
                _id
                user
            }
            comments {
                _id
                user
                name
                date
                comment
            }
            dislikes {
                _id
                user
            }
            bookmarks {
                _id
                user
                date
            }
        }
    }
`

export const DELETE_POST = gql`
  mutation deletePost(
      $postId: ID!
    ) {
        deletePost(postId: $postId)
    }
`

export const EDIT_PROFILE = gql`
    mutation editProfile(
        $name: String!
        $bio: String!
    ) {
        editProfile(
            profileInput:
            {
                name: $name
                    bio: $bio
            }
        ) {
            _id
            name
            bio
        }
    }
`