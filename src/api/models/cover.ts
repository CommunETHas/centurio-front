export default interface DashboardData {
  count: number;
  recommendations: Recommendations[];
  unsuportedTokens: UnsuportedTokens[];
}

export interface Recommendations {
  cover: RecommendationCover;
  reasoning: Reasoning[];
}

export interface UnsuportedTokens {
  name: string;
  address: string;
  symbol: string;
  owner: string;
  logoUrl: string;
}

export interface RecommendationCover {
  name: string;
  address: string;
  type: string;
  logo: string;
  supportedChains: string[];
}

export interface Reasoning {
  token: string;
  logoUrl: string;
  description: string;
}
