export interface Run {
  id: number;
  event: number;
  name: string;
  display_name: string;
  twitch_name: string;
  deprecated_runners: string;
  console: string;
  commentators: string;
  description: string;
  starttime: string;
  endttime: string;
  order: number;
  run_time: string;
  setup_time: string;
  coop: boolean;
  category: string;
  release_year: number;
  giantbomb_id: number | null;
  canonical_url: string;
  public: string;
  runners: number[];
  isNewDate?: boolean;
  parsedStart?: Date;
}

export interface EventMetadata {
  id: number;
  short: string;
  name: string;
  hashtag: string;
  use_one_step_screening: boolean;
  receivername: string;
  targetamount: number;
  minimumdonation: number;
  paypalemail: string;
  paypalcurrency: string;
  datetime: string;
  timezone: string;
  locked: boolean;
  allow_donations: boolean;
  canonical_url: string;
  public: string;
  amount: number;
  count: number;
  max: number;
  avg: number;
}
