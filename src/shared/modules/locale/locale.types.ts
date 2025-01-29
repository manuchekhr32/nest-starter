export enum LocaleKey {
  EN = 'en',
  UZ = 'uz',
}

export type LocaleField<T = string> = Record<LocaleKey, T>;
