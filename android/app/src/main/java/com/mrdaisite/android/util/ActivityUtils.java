package com.mrdaisite.android.util;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.annotation.NonNull;
import android.support.v4.app.FragmentTransaction;
import android.util.Log;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Created by dai on 2018/3/26.
 */
public class ActivityUtils {
    public static void addFragmentToActivity(@NonNull FragmentManager fragmentManager,
                                             @NonNull Fragment fragment, int frameId) {
        checkNotNull(fragmentManager);
        checkNotNull(fragment);
        fragmentManager.beginTransaction()
                .add(frameId, fragment)
                .commit();
    }
}
