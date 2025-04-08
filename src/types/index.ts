// Tipos para usuarios y perfiles
export interface User {
    id: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Profile {
    id: string;
    userId: string;
    fullName: string;
    username: string;
    bio?: string;
    birthDate?: Date;
    position?: string;
    avatar?: string;
    stats: UserStats;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserStats {
    id: string;
    matches: number;
    wins: number;
    draws: number;
    losses: number;
    goalsScored?: number;
}

// Tipos para equipos
export interface Team {
    id: string;
    name: string;
    description?: string;
    logo?: string;
    createdAt: Date;
    updatedAt: Date;
    createdById: string;
    members: TeamMember[];
}

export interface TeamMember {
    id: string;
    teamId: string;
    userId: string;
    role: TeamRole;
    joinedAt: Date;
}

export type TeamRole = 'ADMIN' | 'CAPTAIN' | 'PLAYER';

// Tipos para retos/partidos
export interface Challenge {
    id: string;
    homeTeamId: string;
    awayTeamId?: string;
    date: Date;
    venueId?: string;
    status: ChallengeStatus;
    createdAt: Date;
    updatedAt: Date;
    createdById: string;
    homeScore?: number;
    awayScore?: number;
}

export type ChallengeStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED' | 'CANCELLED';

// Tipos para recintos deportivos
export interface Venue {
    id: string;
    name: string;
    address?: string;
    city: string;
    coordinates?: {
        latitude: number;
        longitude: number;
    };
    createdAt: Date;
    updatedAt: Date;
} 