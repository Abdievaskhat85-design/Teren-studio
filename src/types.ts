export type Language = 'kk' | 'ru';

export interface ServiceItem {
  id: string;
  categoryKey: string;
  titleKk: string;
  titleRu: string;
  subtitleKk: string;
  subtitleRu: string;
  descriptionKk: string;
  descriptionRu: string;
  emotionalHookKk: string;
  emotionalHookRu: string;
  highlightsKk: string[];
  highlightsRu: string[];
  recommendedDuration: string;
  image: string;
  iconName: string;
}

export type VideoSourceType = 'youtube' | 'direct' | 'simulation';

export interface PortfolioItem {
  id: string;
  titleKk: string;
  titleRu: string;
  category: string;
  categoryLabelKk: string;
  categoryLabelRu: string;
  duration: string;
  thumbnail: string;
  videoUrl?: string;
  videoType: VideoSourceType;
  storyContextKk: string;
  storyContextRu: string;
  clientReactionKk: string;
  clientReactionRu: string;
  date: string;
  viewsCount?: string;
}

export interface TimelineStep {
  step: number;
  titleKk: string;
  titleRu: string;
  descriptionKk: string;
  descriptionRu: string;
  durationKk: string;
  durationRu: string;
  iconName: string;
}

export interface TestimonialItem {
  id: string;
  authorKk: string;
  authorRu: string;
  locationKk: string;
  locationRu: string;
  serviceTypeKk: string;
  serviceTypeRu: string;
  commentKk: string;
  commentRu: string;
  rating: number;
  date: string;
  avatarUrl?: string;
  hasVideo?: boolean;
}

export interface InstagramReel {
  id: string;
  titleKk: string;
  titleRu: string;
  thumbnail: string;
  postUrl: string;
  views: string;
  likes: string;
}
