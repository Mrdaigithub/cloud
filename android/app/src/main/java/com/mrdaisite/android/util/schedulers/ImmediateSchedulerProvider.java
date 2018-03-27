package com.mrdaisite.android.util.schedulers;

import io.reactivex.Scheduler;
import io.reactivex.schedulers.Schedulers;

/**
 * Implementation of the {@link BaseSchedulerProvider} making all {@link Scheduler}s execute
 * synchronously so we can easily run assertions in our tests.
 * <p>
 * To achieve this, we are using the {@link io.reactivex.internal.schedulers.TrampolineScheduler} from the {@link Schedulers} class.
 */
public class ImmediateSchedulerProvider implements BaseSchedulerProvider {

    @Override
    public Scheduler computation() {
        return Schedulers.computation();
    }

    @Override
    public Scheduler io() {
        return Schedulers.io();
    }

    @Override
    public Scheduler ui() {
        return Schedulers.trampoline();
    }
}
