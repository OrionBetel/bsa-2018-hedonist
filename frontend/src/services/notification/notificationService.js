export const LIKE_REVIEW_NOTIFICATION               = 'Hedonist\\Notifications\\LikeReviewNotification';
export const DISLIKE_REVIEW_NOTIFICATION            = 'Hedonist\\Notifications\\DislikeReviewNotification';
export const REVIEW_PLACE_NOTIFICATION              = 'Hedonist\\Notifications\\ReviewPlaceNotification';
export const FOLLOWED_USER_REVIEW_NOTIFICATION      = 'Hedonist\\Notifications\\FollowedUserReviewNotification';
export const FOLLOWED_USER_ADD_PLACE_NOTIFICATION   = 'Hedonist\\Notifications\\FollowedUserAddPlaceNotification';
export const USER_FOLLOW_NOTIFICATION               = 'Hedonist\\Notifications\\UserFollowNotification';
export const USER_UNFOLLOW_NOTIFICATION             = 'Hedonist\\Notifications\\UserUnfollowNotification';
export const FOLLOWED_USER_ADD_LIST_NOTIFICATION    = 'Hedonist\\Notifications\\FollowedUserAddListNotification';
export const FOLLOWED_USER_DELETE_LIST_NOTIFICATION = 'Hedonist\\Notifications\\FollowedUserDeleteListNotification';
export const FOLLOWED_USER_UPDATE_LIST_NOTIFICATION = 'Hedonist\\Notifications\\FollowedUserUpdateListNotification';

export const getUserChannelName = (userId) => `App.User.${userId}`;