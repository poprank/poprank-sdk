import { Chain } from "./general";

export const explorerIdentifiers = ['etherscan', 'polygonscan', 'solscan'] as const;
export type ExplorerIdentifier = typeof explorerIdentifiers[number];

export interface ExplorerInfo {
    /**
     * Pretty name for explorer, ie: "Etherscan"
     */
    name: string;
    addressUrlFormatter: (address: string) => string;
}

// ======= Chain-specific marketplace types ======= //
type ChainExplorer<C extends Chain, E extends ExplorerIdentifier> = Record<C, Record<Extract<ExplorerIdentifier, E>, ExplorerInfo>>;

export type EthereumExplorer = ChainExplorer<'ethereum', 'etherscan'>;
export type PolygonExplorer = ChainExplorer<'polygon', 'polygonscan'>;
export type SolanaExplorer = ChainExplorer<'solana', 'solscan'>;

/**
 * Map of chain to all its explorers' info.
 */
export type ChainExplorerMap =
    EthereumExplorer & PolygonExplorer & SolanaExplorer;
