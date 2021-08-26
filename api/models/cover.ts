export default interface DashboardData {
  count: number;
  recommandations: Recommandations[];
  unsuportedTokens: UnsuportedTokens[];
}

export interface Recommandations {
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
  logoUrl: string;
  supportedChains: string[];
}

export interface Reasoning {
  token: string;
  logoUrl: string;
  description: string;
}
