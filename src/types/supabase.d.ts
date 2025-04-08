export type Database = {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string;
                    name: string | null;
                    email: string;
                    emailVerified: string | null;
                    image: string | null;
                };
                Insert: {
                    id: string;
                    name?: string | null;
                    email: string;
                    emailVerified?: string | null;
                    image?: string | null;
                };
                Update: {
                    id?: string;
                    name?: string | null;
                    email?: string;
                    emailVerified?: string | null;
                    image?: string | null;
                };
            };
            profiles: {
                Row: {
                    id: string;
                    userid: string;
                    fullname: string;
                    username: string;
                    bio: string | null;
                    birthdate: string | null;
                    position: string | null;
                    avatar: string | null;
                    statsid: string;
                    createdat: string;
                    updatedat: string;
                };
                Insert: {
                    id?: string;
                    userid: string;
                    fullname: string;
                    username: string;
                    bio?: string | null;
                    birthdate?: string | null;
                    position?: string | null;
                    avatar?: string | null;
                    statsid: string;
                    createdat?: string;
                    updatedat?: string;
                };
                Update: {
                    id?: string;
                    userid?: string;
                    fullname?: string;
                    username?: string;
                    bio?: string | null;
                    birthdate?: string | null;
                    position?: string | null;
                    avatar?: string | null;
                    statsid?: string;
                    createdat?: string;
                    updatedat?: string;
                };
            };
            user_stats: {
                Row: {
                    id: string;
                    matches: number;
                    wins: number;
                    draws: number;
                    losses: number;
                    goalsscored: number | null;
                    createdat: string;
                    updatedat: string;
                };
                Insert: {
                    id?: string;
                    matches: number;
                    wins: number;
                    draws: number;
                    losses: number;
                    goalsscored?: number | null;
                    createdat?: string;
                    updatedat?: string;
                };
                Update: {
                    id?: string;
                    matches?: number;
                    wins?: number;
                    draws?: number;
                    losses?: number;
                    goalsscored?: number | null;
                    createdat?: string;
                    updatedat?: string;
                };
            };
            accounts: {
                Row: {
                    id: string;
                    userid: string;
                    type: string;
                    provider: string;
                    provideraccountid: string;
                    refresh_token: string | null;
                    access_token: string | null;
                    expires_at: number | null;
                    token_type: string | null;
                    scope: string | null;
                    id_token: string | null;
                    session_state: string | null;
                };
                Insert: {
                    id?: string;
                    userid: string;
                    type: string;
                    provider: string;
                    provideraccountid: string;
                    refresh_token?: string | null;
                    access_token?: string | null;
                    expires_at?: number | null;
                    token_type?: string | null;
                    scope?: string | null;
                    id_token?: string | null;
                    session_state?: string | null;
                };
                Update: {
                    id?: string;
                    userid?: string;
                    type?: string;
                    provider?: string;
                    provideraccountid?: string;
                    refresh_token?: string | null;
                    access_token?: string | null;
                    expires_at?: number | null;
                    token_type?: string | null;
                    scope?: string | null;
                    id_token?: string | null;
                    session_state?: string | null;
                };
            };
            sessions: {
                Row: {
                    id: string;
                    userid: string;
                    expires: string;
                    sessiontoken: string;
                };
                Insert: {
                    id?: string;
                    userid: string;
                    expires: string;
                    sessiontoken: string;
                };
                Update: {
                    id?: string;
                    userid?: string;
                    expires?: string;
                    sessiontoken?: string;
                };
            };
            verification_tokens: {
                Row: {
                    identifier: string;
                    token: string;
                    expires: string;
                };
                Insert: {
                    identifier: string;
                    token: string;
                    expires: string;
                };
                Update: {
                    identifier?: string;
                    token?: string;
                    expires?: string;
                };
            };
        };
        Views: {};
        Functions: {};
    };
}; 