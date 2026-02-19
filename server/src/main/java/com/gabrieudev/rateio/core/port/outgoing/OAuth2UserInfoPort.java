package com.gabrieudev.rateio.core.port.outgoing;

import java.util.Map;

public interface OAuth2UserInfoPort {
    String getId();

    String getName();

    String getEmail();

    String getImageUrl();

    Map<String, Object> getAttributes();
}