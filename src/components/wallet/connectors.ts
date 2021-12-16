import {UAuthConnector} from '@uauth/web3-react'
import type {AbstractConnector} from '@web3-react/abstract-connector'
import {InjectedConnector} from '@web3-react/injected-connector'
import {WalletConnectConnector} from '@web3-react/walletconnect-connector'

// Instanciate your other connectors.
export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 56, 0x38]
});

export const walletconnect = new WalletConnectConnector({
  infuraId: "5d1bd562969f8efb9d85734900f5c266",
  qrcode: true,
})

export const uauth = new UAuthConnector({
    clientID: '1qyHcme87hjRz8XDZXjmU8MDsXrEnADy7OcLqzBz0oo=',
    clientSecret: 'qfddsE1aV2AJUQyhNCv+rt8F1nB6m+7TrlL8qZbfX0o=',
    redirectUri: 'localhost:3000/callback',
    // postLogoutRedirectUri: process.env.REACT_APP_POST_LOGOUT_REDIRECT_URI!,
    // fallbackIssuer: process.env.REACT_APP_FALLBACK_ISSUER!,

    // Scope must include openid and wallet
    scope: 'openid wallet',
  // Injected and walletconnect connectors are required
  connectors: {injected, walletconnect},
})

const connectors: Record<string, AbstractConnector> = {
  injected,
  walletconnect,
  uauth,
}

export default connectors