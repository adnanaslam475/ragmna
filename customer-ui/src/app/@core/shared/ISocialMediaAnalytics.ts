export interface IFacebook {
  impressionsUnique: string;
  engagedUsers: number;
  clicksUnique: number;
  negativeFeedback: number;
  negativeFeedbackUnique: number;
  videoViews: number;
  videoViewsUnique: number;
  videoViewTime: number;
  reactions: IFBReactions;
}

export interface IFBReactions {
  like: number;
  love: number;
  anger: number;
  haha: number;
  wow: number;
  sorry: number;
  total: number;
}

export interface IInstagram {
  engagementCount: number;
  impressionsCount: number;
  reachCount: number;
  savedCount: number;
  videoViews: number;
  likeCount: number;
  commentsCount: number;
}

export interface ITwitter {
  post: string;
  publicMetrics: PublicMetrics;
  nonPublicMetrics: NonPublicMetrics;
  organicMetrics: OrganicMetrics;
}

export interface OrganicMetrics {
  likeCount: number;
  impressionCount: number;
  replyCount: number;
  retweetCount: number;
  userProfileClicks: number;
  video: Video2;
}

export interface Video2 {
  playback25Count: number;
  playback0Count: number;
  playback100Count: number;
  viewCount: number;
  playback50Count: number;
  playback75Count: number;
}

export interface NonPublicMetrics {
  userProfileClicks: number;
  impressionCount: number;
  video: Video;
}

export interface Video {
  playback25Count: number;
  playback50Count: number;
  playback75Count: number;
  playback0Count: number;
  playback100Count: number;
}

export interface PublicMetrics {
  retweetCount: number;
  quoteCount: number;
  likeCount: number;
  replyCount: number;
}

export interface IYoutube {
  viewCount: number;
  commentCount: number;
  likeCount: number;
  dislikeCount: number;
  clickCount: number;
  estimatedMinutesWatched: number;
  averageViewDuration: number;
  averageViewPercentage: number;
  subscribersGained: number;
}
export interface IPinterest {
  impression: number;
  save: number;
  pinClick: number;
  outboundClick: number;
  videoMrcView: number;
  videoAvgWatchTime: number;
  videoV50WatchTime: number;
  quartile95PercentView: number;
}

export interface ITikTok {
  createTime: number;
  shareUrl: string;
  videoDescription: string;
  duration: number;
  title: string;
  embedLink: string;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  viewCount: number;
}
