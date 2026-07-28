export enum EventType {
  UnlockTokens = 'Unlock Tokens',
  Airdrops = 'Airdrops',
  ICO = 'ICO',
  Listing = 'Listing',
  Halving = 'Halving',
}

export interface CryptoEvent {
  type: EventType;
}

const EVENT_COLORS: Record<EventType, string> = {
  [EventType.UnlockTokens]: '#faad14',
  [EventType.Airdrops]: '#52c41a',
  [EventType.ICO]: '#1890ff',
  [EventType.Listing]: '#722ed1',
  [EventType.Halving]: '#f5222d',
};