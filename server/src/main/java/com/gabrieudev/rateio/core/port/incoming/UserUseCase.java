package com.gabrieudev.rateio.core.port.incoming;

import com.gabrieudev.rateio.core.domain.User;

public interface UserUseCase {
    User getCurrentUser(Long userId);
}