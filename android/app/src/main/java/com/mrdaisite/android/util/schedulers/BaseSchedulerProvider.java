package com.mrdaisite.android.util.schedulers;

import io.reactivex.Scheduler;
import io.reactivex.annotations.NonNull;

/**
 * Allow providing different types of {@link Scheduler}s.
 */

public interface BaseSchedulerProvider {
    @NonNull
    Scheduler computation();

    @NonNull
    Scheduler io();

    @NonNull
    Scheduler ui();
}
