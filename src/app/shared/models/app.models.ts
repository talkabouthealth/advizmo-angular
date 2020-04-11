export class AppModels {

}

export class Localized {
    constructor(
        public available: string,
        public current: string
    ) {}
}

export class Balances {
    constructor(
        public available: number,
        public currency: string,
        public current: number,
        public localized: Localized
    ) {}
}

export class Account {
    constructor(
        public account_id: string,
        public balances: Balances,
        public mask: string,
        public name: string,
        public subtype: string,
        public type: string
    ) {}
}

export class CreateItemResponse {
    constructor(
        public accounts: Account[],
        public public_token: string,
        public request_id: string
    ) {}
}
