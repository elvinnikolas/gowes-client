import gql from 'graphql-tag'

//QUERY
export const LOGIN_USER = gql`
    mutation login(
        $email: String!
        $password: String!
    ) {
        login(email: $email, password: $password) 
        {
            _id
            name
            email
            image
            date
            isAdmin
            token
        }
    }
`

export const REGISTER_USER = gql`
    mutation register(
        $name: String!
        $email: String!
        $password: String!
    ) {
        register(
            registerInput: {
                name: $name,
                email: $email,
                password: $password
            }
        ) {
            _id
            name
            email
            image
            date
            isAdmin
            token
        }
    }
`

export const GET_POSTS = gql`
    query {
        getPosts {
            _id
            user {
                _id
                name
                image
            }
            date
            title
            content
            images
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
                user {
                    _id
                    name
                    image
                }
                comment
            }
            community {
                _id
                name
            }
        }
    }
`

export const GET_POST = gql`
  query($postId: ID!) {
      getPost(postId: $postId) {
            _id
            user {
                _id
                name
                image
            }
            title
            date
            content
            images
            likes {
                _id
                user
            }
            comments {
                _id
                user {
                    _id
                    name
                    image
                }
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

export const GET_BOOKMARK_POSTS = gql`
  query($filter: String!) {
      getBookmarkPosts(filter: $filter) {
            _id
            user {
                _id
                name
                image
            }
            title
            date
            content
            images
            likes {
                _id
                user
            }
            comments {
                _id
                user {
                    _id
                    name
                    image
                }
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
            user {
                _id
                name
                image
            }
            title
            date
            content
            images
            likes {
                _id
                user
            }
            comments {
                _id
                user {
                    _id
                    name
                    image
                }
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

export const GET_EXPLORE_POSTS = gql`
  query($filter: String!) {
    getExplorePosts(filter: $filter) {
        _id
        user {
            _id
            name
            image
        }
        title
        date
        content
        images
        likes {
            _id
            user
        }
        comments {
            _id
            user {
                _id
                name
                image
            }
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

export const GET_COMMUNITIES = gql`
  query {
    getCommunities {
        _id
        name
        bio
        date
        city
        province
        image
        isPrivate
        isActive
        memberCount
      }
  }
`

export const GET_APPROVE_COMMUNITIES = gql`
  query {
    getApproveCommunities {
        _id
        name
        bio
        date
        city
        province
        image
        isPrivate
        isActive
        memberCount
      }
  }
`

export const GET_FILTER_COMMUNITIES = gql`
  query($filter: String, $location: String, $sort: String) {
    getFilterCommunities(filter: $filter, location: $location, sort: $sort) {
        _id
        name
        bio
        date
        city
        province
        image
        isPrivate
        isActive
        memberCount
      }
  }
`

export const GET_USER = gql`
    query($id: ID!) {
        getUser(id: $id) {
            _id
            name
            bio
            image
        }
    }
`

export const GET_CHATS = gql`
    query {
        getChats {
            _id
            users {
                _id
                name
                image
            }
            status {
                user
                read
            }
            lastMessage
            sent
        }
    }
`

export const GET_MESSAGES = gql`
    query($chatId: ID!) {
        getMessages(chatId: $chatId) {
            _id
            chat
            from
            to
            content
            sent
        }
    }
`

//FETCH QUERIES
export const FETCH_QUERY_HOME = gql`
  query($id: ID!, $communityId: ID!, $filter: String!) {
    getUserCommunities(userId: $id) {
        _id
        community {
            _id
            name
            bio
        }
    }
    getUserCommunitiesPosts(filter: $filter) {
        _id
        user {
            _id
            name
            image
        }
        title
        date
        content
        images
        likes {
            _id
            user
        }
        comments {
            _id
            user {
                _id
                name
                image
            }
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
    getUserCommunityPosts(communityId: $communityId, filter: $filter) {
        _id
        user {
            _id
            name
            image
        }
        title
        date
        content
        images
        likes {
            _id
            user
        }
        comments {
            _id
            user {
                _id
                name
                image
            }
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
        image
      }
      getUserPosts(id: $id) {
        _id
        user {
            _id
            name
            image
        }
        date
        title
        content
        images
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
            user {
                _id
                name
                image
            }
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

export const FETCH_QUERY_HEADER_COMMUNITY = gql`
    query($userId: ID!, $communityId: ID!) {
        getCommunity(communityId: $communityId) {
            _id
            name
            bio
            date
            city
            province
            image
            isPrivate
            isActive
            memberCount
        }
        getMemberStatus(communityId: $communityId, userId: $userId) {
            _id
            isAdmin
            isJoin
            isRequest
        }
        getCommunityPosts(communityId: $communityId) {
            _id
            user {
                _id
                name
                image
            }
            title
            date
            content
            images
            likes {
                _id
                user
            }
            comments {
                _id
                user {
                    _id
                    name
                    image
                }
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
            }
        }
        getCommunityMembers(communityId: $communityId) {
            _id
            user {
                _id
                name
                bio
                image
            }
            isJoin
            isAdmin
        }
        getCommunityMemberRequests(communityId: $communityId) {
            _id
            user {
                _id
                name
                bio
                image
            }
            message
        }
    }
`

export const FETCH_QUERY_MENU_COMMUNITY = gql`
  query($userId: ID!, $communityId: ID!) {
    getCommunity(communityId: $communityId) {
        _id
        name
        bio
        date
        city
        province
        image
        isPrivate
        isActive
        memberCount
    }
    getMemberStatus(communityId: $communityId, userId: $userId) {
        _id
        isAdmin
        isJoin
        isRequest
    }
    getCommunityPosts(communityId: $communityId) {
        _id
        user {
            _id
            name
            image
        }
        title
        date
        content
        images
        likes {
            _id
            user
        }
        comments {
            _id
            user {
                _id
                name
                image
            }
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
        }
    }
    getCommunityMembers(communityId: $communityId) {
        _id
        user {
            _id
            name
            bio
            image
        }
        isJoin
        isAdmin
    }
    getCommunityMemberRequests(communityId: $communityId) {
        _id
        user {
            _id
            name
            bio
            image
        }
        message
    }
  }
`

export const FETCH_QUERY_COMMUNITY = gql`
  query($userId: ID!, $communityId: ID!) {
    getCommunity(communityId: $communityId) {
        _id
        name
        bio
        date
        city
        province
        image
        isPrivate
        isActive
        memberCount
    }
    getMemberStatus(communityId: $communityId, userId: $userId) {
        _id
        isAdmin
        isJoin
        isRequest
    }
    getCommunityPosts(communityId: $communityId) {
        _id
        user {
            _id
            name
            image
        }
        title
        date
        content
        images
        likes {
            _id
            user
        }
        comments {
            _id
            user {
                _id
                name
                image
            }
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
        }
    }
    getCommunityMembers(communityId: $communityId) {
        _id
        user {
            _id
            name
            bio
            image
        }
        isJoin
        isAdmin
    }
    getCommunityMemberRequests(communityId: $communityId) {
        _id
        user {
            _id
            name
            bio
            image
        }
        message
    }
  }
`

export const FETCH_QUERY_COMMUNITY_GUEST = gql`
  query($communityId: ID!) {
    getCommunity(communityId: $communityId) {
        _id
        name
        bio
        date
        city
        province
        image
        isPrivate
        isActive
        memberCount
    }
    getCommunityPosts(communityId: $communityId) {
        _id
        user {
            _id
            name
            image
        }
        title
        date
        content
        images
        likes {
            _id
            user
        }
        comments {
            _id
            user {
                _id
                name
                image
            }
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
        }
    }
  }
`

export const GET_FAQS = gql`
    query {
        getFaqs {
            _id
            category
            contents{
                _id
                image
                question
                answer
            }
        }
    }
`

export const GET_NOTIFICATIONS = gql`
    query($id: ID!) {
        getNotifications(id: $id) {
            _id
            community {
                _id
                name
                image
            }
            content
            date
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
            user {
                _id
                name
                image
            }
            title
            date
            content
            images
            likes {
                _id
                user
            }
            comments {
                _id
                user {
                    _id
                    name
                    image
                }
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
export const ADD_COMMENT = gql`
    mutation addComment(
        $postId: ID!
        $comment: String!
    ) {
        addComment(postId: $postId, comment: $comment) 
        {
            _id
            comments{
                _id
                user {
                    _id
                    name
                    image
                }
                date
                comment
            }
        }
    }
`

export const DELETE_COMMENT = gql`
  mutation deleteComment(
      $postId: ID!
      $commentId: ID!
    ) {
        deleteComment(postId: $postId, commentId: $commentId) {
            _id
            comments {
                _id
                user {
                    _id
                    name
                    image
                }
                date
                comment
            }
        }
    }
`

export const EDIT_PROFILE = gql`
    mutation editProfile(
        $name: String!
        $bio: String!
        $image: String!
    ) {
        editProfile(
            profileInput:
            {
                name: $name
                bio: $bio
                image: $image
            }
        ) {
            _id
            name
            bio
            image
        }
    }
`

export const REQUEST_MEMBER = gql`
  mutation requestJoinCommunity(
      $communityId: ID!
      $message: String
    ) {
        requestJoinCommunity(communityId: $communityId, message: $message) {
            _id
            isAdmin
            isJoin
            isRequest
        }
    }
`

export const JOIN_MEMBER = gql`
  mutation joinCommunity(
      $communityId: ID!
    ) {
        joinCommunity(communityId: $communityId) {
            _id
            isAdmin
            isJoin
            isRequest
        }
    }
`

export const LEAVE_MEMBER = gql`
  mutation leaveCommunity(
      $communityId: ID!
    ) {
        leaveCommunity(communityId: $communityId)
    }
`

export const ACCEPT_MEMBER = gql`
  mutation acceptMember(
      $communityId: ID!
      $userId: ID!
    ) {
        acceptMember(communityId: $communityId, userId: $userId) {
            _id
            isAdmin
            isJoin
            isRequest
        }
    }
`

export const REJECT_MEMBER = gql`
  mutation rejectMember(
      $communityId: ID!
      $userId: ID!
    ) {
        rejectMember(communityId: $communityId, userId: $userId)
    }
`

export const APPOINT_ADMIN = gql`
  mutation appointAdmin(
      $communityId: ID!
      $userId: ID!
    ) {
        appointAdmin(communityId: $communityId, userId: $userId) {
            _id
            isAdmin
            isJoin
            isRequest
        }
    }
`

export const REMOVE_MEMBER = gql`
  mutation removeMember(
      $communityId: ID!
      $userId: ID!
    ) {
        removeMember(communityId: $communityId, userId: $userId)
    }
`

export const APPROVE_COMMUNITY = gql`
  mutation approveCommunity(
      $communityId: ID!
    ) {
        approveCommunity(communityId: $communityId)
    }
`

export const DISAPPROVE_COMMUNITY = gql`
  mutation disapproveCommunity(
      $communityId: ID!
    ) {
        disapproveCommunity(communityId: $communityId)
    }
`

export const CREATE_COMMUNITY = gql`
  mutation createCommunity(
      $name: String!
      $bio: String!
      $city: String!
      $province: String!
      $image: String!
      $isPrivate: Boolean!
    ) {
        createCommunity(
            communityInput: {
                name: $name
                bio: $bio
                city: $city
                province: $province
                image: $image
                isPrivate: $isPrivate
            }
        ) {
            _id
            name
            bio
        }
    }
`

export const CREATE_POST = gql`
  mutation createPost(
      $title: String!
      $content: String!
      $communityId: ID!
      $images: [String]
    ) {
        createPost(title: $title, content: $content, communityId: $communityId, images: $images) {
            _id
            user {
                _id
                name
                image
            }
            title
            date
            content
            images
            likes {
                _id
                user
            }
            comments {
                _id
                user {
                    _id
                    name
                    image
                }
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

export const SEND_MESSAGE = gql`
  mutation sendMessage(
      $chatId: ID!
      $to: ID!
      $content: String!
    ) {
        sendMessage(chatId: $chatId, to: $to, content: $content) {
            _id
            chat
            from
            to
            content
            sent
        }
    }
`

export const NEW_CHAT = gql`
  mutation newChat(
      $to: ID!
    ) {
        newChat(to: $to) {
            _id
        }
    }
`

export const ADD_FAQ_CATEGORY = gql`
  mutation addFaqCategory(
      $category: String!
    ) {
        addFaqCategory(category: $category) {
            _id
            category
            contents{
                _id
                image
                question
                answer
            }
        }
    }
`

export const REMOVE_FAQ = gql`
  mutation removeFaq(
      $category: String!
    ) {
        removeFaq(category: $category)
    }
`

export const ADD_FAQ = gql`
  mutation addFaqCategory(
      $category: String!
      $image: String
      $question: String!
      $answer: String!
    ) {
        addFaq(category: $category, image: $image, question: $question, answer: $answer) {
            _id
            category
            contents{
                _id
                image
                question
                answer
            }
        }
    }
`


//SUBSCRIPTION
export const NEW_MESSAGE = gql`
  subscription newMessage {
        newMessage{
            _id
            chat
            from
            to
            content
            sent
        }
    }
`