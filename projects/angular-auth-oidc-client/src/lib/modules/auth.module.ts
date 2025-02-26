import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { OidcDataService } from '../data-services/oidc-data.service';
import { IFrameService } from '../services/existing-iframe.service';
import { EqualityHelperService } from '../services/oidc-equality-helper.service';
import { StateValidationService } from '../services/oidc-security-state-validation.service';
import { TokenHelperService } from '../services/oidc-token-helper.service';
import { LoggerService } from '../services/oidc.logger.service';
import { OidcSecurityCheckSession } from '../services/oidc.security.check-session';
import { OidcSecurityCommon } from '../services/oidc.security.common';
import { OidcConfigService } from '../services/oidc.security.config.service';
import { OidcSecurityService } from '../services/oidc.security.service/oidc.security.service';
import { OidcSecuritySilentRenew } from '../services/oidc.security.silent-renew';
import { BrowserStorage, OidcSecurityStorage } from '../services/oidc.security.storage';
import { OidcSecurityUserService } from '../services/oidc.security.user-service';
import { OidcSecurityValidation } from '../services/oidc.security.validation';
import { OidcSecurityBrowserService } from '../services/oidc.security.service/oidc.security.browser.service';
import { OidcSecurityServerService } from '../services/oidc.security.service/oidc.security.server.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ]
})
export class AuthModule {
    /**
     * @deprecated use forServer or forBrowser instead
     * @param token
     */
    static forRoot(token: Token = {}): ModuleWithProviders<AuthModule> {
        return AuthModule.forBrowser(token);
    }

    /**
     * Instantiate the module for use within a browser app.
     * @param token
     */
    static forBrowser(token: Token = {}): ModuleWithProviders<AuthModule> {
        return {
            ngModule: AuthModule,
            providers: [
                OidcConfigService,
                {
                    provide: OidcSecurityService,
                    useClass: OidcSecurityBrowserService
                },
                OidcSecurityValidation,
                OidcSecurityCheckSession,
                OidcSecuritySilentRenew,
                OidcSecurityUserService,
                OidcSecurityCommon,
                TokenHelperService,
                LoggerService,
                IFrameService,
                EqualityHelperService,
                OidcDataService,
                StateValidationService,
                {
                    provide: OidcSecurityStorage,
                    useClass: token.storage || BrowserStorage,
                },
            ],
        };
    }

    /**
     * Instantiate the module for use within a server app.
     * @param token
     */
    static forServer(token: Token = {}): ModuleWithProviders<AuthModule> {
        return {
            ngModule: AuthModule,
            providers: [
                OidcConfigService,
                {
                    provide: OidcSecurityService,
                    useClass: OidcSecurityServerService
                },
                OidcSecurityValidation,
                OidcSecurityCheckSession,
                OidcSecuritySilentRenew,
                OidcSecurityUserService,
                OidcSecurityCommon,
                TokenHelperService,
                LoggerService,
                IFrameService,
                EqualityHelperService,
                OidcDataService,
                StateValidationService,
                {
                    provide: OidcSecurityStorage,
                    useClass: token.storage || BrowserStorage,
                },
            ],
        };
    }

}

export interface Type<T> extends Function {
    new (...args: any[]): T;
}

export interface Token {
    storage?: Type<any>;
}
