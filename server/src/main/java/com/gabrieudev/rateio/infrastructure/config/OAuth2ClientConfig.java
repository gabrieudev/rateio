package com.gabrieudev.rateio.infrastructure.config;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.oauth2.client.InMemoryOAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistration.Builder;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;

@Configuration
public class OAuth2ClientConfig {

    private final Environment env;

    public OAuth2ClientConfig(Environment env) {
        this.env = env;
    }

    @Bean
    ClientRegistrationRepository clientRegistrationRepository() {
        List<ClientRegistration> registrations = new ArrayList<>();

        ClientRegistration google = buildRegistration("google");
        if (google != null) {
            registrations.add(google);
        }

        ClientRegistration facebook = buildRegistration("facebook");
        if (facebook != null) {
            registrations.add(facebook);
        }

        ClientRegistration github = buildRegistration("github");
        if (github != null) {
            registrations.add(github);
        }

        return new InMemoryClientRegistrationRepository(registrations);
    }

    @Bean
    OAuth2AuthorizedClientService authorizedClientService(
            ClientRegistrationRepository clientRegistrationRepository) {
        return new InMemoryOAuth2AuthorizedClientService(clientRegistrationRepository);
    }

    private ClientRegistration buildRegistration(String registrationId) {
        String clientId = getPropertyWithFallback(
                "spring.security.oauth2.client.registration." + registrationId + ".client-id",
                "spring.security.oauth2.client.registration." + registrationId + ".clientId");
        if (!hasText(clientId))
            return null;

        String clientSecret = getPropertyWithFallback(
                "spring.security.oauth2.client.registration." + registrationId + ".client-secret",
                "spring.security.oauth2.client.registration." + registrationId + ".clientSecret");
        String redirectUri = env.getProperty(
                "spring.security.oauth2.client.registration." + registrationId + ".redirect-uri",
                "{baseUrl}/oauth2/callback/{registrationId}");
        String scopeProp = getPropertyWithFallback(
                "spring.security.oauth2.client.registration." + registrationId + ".scope",
                "spring.security.oauth2.client.registration." + registrationId + ".scope");
        List<String> scopes = scopeProp != null ? Arrays.asList(scopeProp.split(","))
                : defaultScopesFor(registrationId);

        Builder builder = ClientRegistration.withRegistrationId(registrationId)
                .clientId(clientId)
                .clientSecret(clientSecret == null ? "" : clientSecret)
                .redirectUri(redirectUri)
                .scope(scopes.toArray(new String[0]));

        switch (registrationId.toLowerCase()) {
            case "google":
                builder.clientName("Google")
                        .authorizationUri("https://accounts.google.com/o/oauth2/v2/auth")
                        .tokenUri("https://oauth2.googleapis.com/token")
                        .userInfoUri("https://www.googleapis.com/oauth2/v3/userinfo")
                        .userNameAttributeName("sub")
                        .authorizationGrantType(
                                org.springframework.security.oauth2.core.AuthorizationGrantType.AUTHORIZATION_CODE);
                break;
            case "facebook":
                String facebookUserInfo = env.getProperty(
                        "spring.security.oauth2.client.provider.facebook.user-info-uri",
                        "https://graph.facebook.com/v3.0/me?fields=id,first_name,middle_name,last_name,name,email,verified,is_verified,picture.width(250).height(250)");
                builder.clientName("Facebook")
                        .authorizationUri(
                                env.getProperty("spring.security.oauth2.client.provider.facebook.authorization-uri",
                                        "https://www.facebook.com/v3.0/dialog/oauth"))
                        .tokenUri(env.getProperty("spring.security.oauth2.client.provider.facebook.token-uri",
                                "https://graph.facebook.com/v3.0/oauth/access_token"))
                        .userInfoUri(facebookUserInfo)
                        .userNameAttributeName("id")
                        .authorizationGrantType(
                                org.springframework.security.oauth2.core.AuthorizationGrantType.AUTHORIZATION_CODE);
                break;
            case "github":
                builder.clientName("GitHub")
                        .authorizationUri("https://github.com/login/oauth/authorize")
                        .tokenUri("https://github.com/login/oauth/access_token")
                        .userInfoUri("https://api.github.com/user")
                        .userNameAttributeName("id")
                        .authorizationGrantType(
                                org.springframework.security.oauth2.core.AuthorizationGrantType.AUTHORIZATION_CODE);
                break;
            default:
                // outros provedores
                return null;
        }

        return builder.build();
    }

    private String getPropertyWithFallback(String primary, String fallback) {
        String v = env.getProperty(primary);
        if (v == null)
            v = env.getProperty(fallback);
        return v;
    }

    private boolean hasText(String s) {
        return s != null && !s.trim().isEmpty();
    }

    private List<String> defaultScopesFor(String registrationId) {
        if ("google".equalsIgnoreCase(registrationId)) {
            return Arrays.asList("openid", "profile", "email");
        } else if ("facebook".equalsIgnoreCase(registrationId)) {
            return Arrays.asList("email", "public_profile");
        } else if ("github".equalsIgnoreCase(registrationId)) {
            return Arrays.asList("read:user", "user:email");
        }
        return List.of();
    }
}
