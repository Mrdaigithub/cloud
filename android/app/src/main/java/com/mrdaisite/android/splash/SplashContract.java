package com.mrdaisite.android.splash;

import com.mrdaisite.android.BasePresenter;
import com.mrdaisite.android.BaseView;

/**
 * Created by dai on 2018/3/22.
 */

public interface SplashContract {
    interface View extends BaseView<Presenter> {
        void showLogin();

        void delayIntoLogin(int delayTime);
    }

    interface Presenter extends BasePresenter {

    }
}
