package com.mrdaisite.android.splash;


import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.mrdaisite.android.MainActivity;
import com.mrdaisite.android.R;

import org.reactivestreams.Subscriber;
import org.reactivestreams.Subscription;

import java.util.concurrent.TimeUnit;

import io.reactivex.Flowable;
import io.reactivex.Observable;
import io.reactivex.ObservableEmitter;
import io.reactivex.ObservableOnSubscribe;
import io.reactivex.Observer;
import io.reactivex.Scheduler;
import io.reactivex.disposables.CompositeDisposable;
import io.reactivex.disposables.Disposable;

import static com.google.common.base.Preconditions.checkNotNull;


/**
 * A simple {@link Fragment} subclass.
 * create an instance of this fragment.
 */
public class SplashFragment extends Fragment implements SplashContract.View {

    private static final short SPLASH_SHOW_SECONDS = 2;

    private SplashContract.Presenter mPersenter;

    @NonNull
    private CompositeDisposable mCompositeDisposable;

    public static SplashFragment newInstance() {

        Bundle args = new Bundle();

        SplashFragment fragment = new SplashFragment();
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onResume() {
        super.onResume();
        mPersenter.subscribe();
    }

    @Override
    public void onPause() {
        super.onPause();
        mPersenter.unsubscribe();
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        final String TAG = "debug";
        Flowable.just(1, 2, 3, 4)
                .timer(1, TimeUnit.SECONDS)
                .subscribe(s -> Log.e(TAG, "onCreateView: " + s));

        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.splash_frag, container, false);
    }

    @Override
    public void setPresenter(SplashContract.Presenter presenter) {
        mPersenter = checkNotNull(presenter);
    }

    @Override
    public void toMainActivity() {
        Intent intent = new Intent(getContext(), MainActivity.class);
        startActivity(intent);
    }
}
