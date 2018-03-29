package com.mrdaisite.android.Login;

import com.mrdaisite.android.BasePresenter;
import com.mrdaisite.android.BaseView;

/**
 * Created by dai on 2018/3/29.
 */
public interface LoginContract {
    interface View extends BaseView<Presenter> {
        void toLoginActivity();
    }

    interface Presenter extends BasePresenter {
    }
}
